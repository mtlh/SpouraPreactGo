package api

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"spoura/db"
	"spoura/funcs"
	"spoura/types"
	"strings"

	"github.com/stripe/stripe-go/v78"
	"github.com/stripe/stripe-go/v78/paymentintent"
)

func PaymentIntentHandler(w http.ResponseWriter, r *http.Request) {

	parts := strings.Split(r.URL.Path, "/")
	keyString := strings.Join(parts[3:], "/")

	if len(parts) < 3 {
		http.Error(w, "URL not structured correctly -> follow /api/paymentintent/key", http.StatusBadRequest)
		return
	}

	log.Print(keyString)
	if keyString[len(keyString)-1] != '=' {
		keyString += "="
	}
	keyString, err := funcs.DecryptWithPrivateKey(keyString)
	if err != nil {
		http.Error(w, err.Error(), http.StatusOK)
		return
	}

	db := db.InitDB()
	defer db.Close()
	rows, err := db.Query("SELECT User.id, User.cart FROM Session JOIN User ON Session.userid = User.id WHERE Session.key = ?", keyString)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var cartJSON string
	var userID int
	var cart []types.CartItem
	for rows.Next() {
		if err := rows.Scan(&userID, &cartJSON); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		json.Unmarshal([]byte(cartJSON), &cart)
	}
	defer rows.Close()

	// loop cart and get total price & number of items
	var totalPrice float64
	var itemCount int
	for _, item := range cart {
		totalPrice += item.Price
		itemCount++
	}

	stripe.Key = os.Getenv("STRIPE_SECRET")
	params := &stripe.PaymentIntentParams{
		Amount:           stripe.Int64(2000),
		Currency:         stripe.String(string(stripe.CurrencyGBP)),
		SetupFutureUsage: stripe.String("off_session"),
	}
	result, err := paymentintent.New(params)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Return only the client intent ID
	response := struct {
		ClientSecret string  `json:"clientSecret"`
		CartTotal    float64 `json:"cartTotal"`
		ItemCount    int     `json:"itemCount"`
	}{
		ClientSecret: result.ClientSecret,
		CartTotal:    totalPrice,
		ItemCount:    itemCount,
	}

	jsonResponse, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}
