package api

import (
	"encoding/json"
	"log"
	"net/http"
	"spoura/db"
	"spoura/funcs"
	"spoura/types"
	"strings"

	_ "github.com/tursodatabase/libsql-client-go/libsql"
)

// Process session key if given, return user object

func ClearCartHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	parts := strings.Split(r.URL.Path, "/")
	keyString := strings.Join(parts[3:], "/")

	if len(parts) < 3 {
		http.Error(w, "Key not found in URL -> follow /api/clearcart/key", http.StatusBadRequest)
		return
	}

	if keyString[len(keyString)-1] != '=' {
		keyString += "="
	}
	keyString, err := funcs.DecryptWithPrivateKey(keyString)
	if err != nil {
		http.Error(w, err.Error(), http.StatusOK)
		return
	}
	log.Print(keyString)

	db := db.InitDB()
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

	if err := rows.Err(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	log.Print(userID, cart)

	for _, item := range cart {
		_, err := db.Query("INSERT INTO `Order` (userid, producturlslug, quantity, size, date) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)", userID, item.URLslug, item.Quantity, item.Size)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	_, err = db.Query("UPDATE User SET cart = '{}' WHERE id = ?", userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	defer db.Close()

	w.Header().Set("Content-Type", "text/plain")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Order logged and cart cleared."))
}
