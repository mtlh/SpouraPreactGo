package api

import (
	"encoding/json"
	"strconv"

	// "log"
	"net/http"
	"spoura/db"
	"spoura/funcs"
	"spoura/types"
	"strings"

	_ "github.com/tursodatabase/libsql-client-go/libsql"
)

// Process session key if given, return user object

func CartHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	parts := strings.Split(r.URL.Path, "/")

	doremove := true
	if parts[3] == "add" {
		doremove = false
	}

	keyString := strings.Join(parts[7:], "/")

	if len(parts) < 7 {
		http.Error(w, "URL not structured correctly -> follow /api/cart/method/product/quantity/size/key", http.StatusBadRequest)
		return
	}

	// log.Print(keyString)
	if keyString[len(keyString)-1] != '=' {
		keyString += "="
	}
	keyString, err := funcs.DecryptWithPrivateKey(keyString)
	if err != nil {
		http.Error(w, err.Error(), http.StatusOK)
		return
	}

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

	rows, err = db.Query("SELECT Name, Price, URLSlug, ImgURL FROM Product WHERE urlslug = ?", parts[4])
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var NewItem types.CartItem
	// log.Print("NewItem Size:", funcs.NumberOnly(parts[6]))
	// log.Print("NewItem Quantity:", funcs.NumberOnly(parts[5]))
	NewItem.Size = strconv.Itoa(funcs.NumberOnly(parts[6]))
	NewItem.Quantity = strconv.Itoa(funcs.NumberOnly(parts[5]))
	for rows.Next() {
		if err := rows.Scan(&NewItem.Name, &NewItem.Price, &NewItem.URLslug, &NewItem.ImgURL); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
	defer rows.Close()

	if err := rows.Err(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if doremove {
		for i, item := range cart {
			// log.Print(item, NewItem)
			// log.Print(item.URLslug, NewItem.URLslug)
			// log.Print(item.Quantity, NewItem.Quantity)
			// log.Print(item.Size, NewItem.Size)
			if item.URLslug == NewItem.URLslug && item.Quantity == NewItem.Quantity && item.Size == NewItem.Size {
				cart = append(cart[:i], cart[i+1:]...)
				break
			}
		}
	} else {
		cart = append(cart, NewItem)
	}

	jsonData, err := json.Marshal(cart)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	_, err = db.Exec("UPDATE User SET cart = ? WHERE id = ?", jsonData, userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer db.Close()

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonData)
}
