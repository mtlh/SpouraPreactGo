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

func SessionHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	parts := strings.Split(r.URL.Path, "/")
	keyString := strings.Join(parts[3:], "/")

	if len(parts) < 3 {
		http.Error(w, "Key not found in URL -> follow /api/session/key", http.StatusBadRequest)
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
	rows, err := db.Query("SELECT User.id, User.email, User.nickname, User.cart, User.favourites FROM User JOIN Session ON Session.userid = User.id WHERE Session.key = ?", keyString)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	defer db.Close()

	var user types.User
	var cartJSON, favouritesJSON string
	for rows.Next() {
		if err := rows.Scan(
			&user.ID, &user.Email, &user.Nickname,
			&cartJSON, &favouritesJSON); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		json.Unmarshal([]byte(cartJSON), &user.Cart)
		json.Unmarshal([]byte(favouritesJSON), &user.Favourites)
	}

	log.Print(user.ID, *user.Email, user.Nickname)

	if err := rows.Err(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	rows, err = db.Query("SELECT urlslug, name FROM Product")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var autcompleteProducts []types.ProductAutocomplete
	for rows.Next() {
		var product types.Product
		if err := rows.Scan(
			&product.URLSlug, &product.Name); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		autcompleteProducts = append(autcompleteProducts, types.ProductAutocomplete{
			URLSlug: product.URLSlug,
			Name:    product.Name,
		})
	}

	if err := rows.Err(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	userMap := map[string]interface{}{
		"ID":           user.ID,
		"Nickname":     user.Nickname,
		"Cart":         user.Cart,
		"Favourites":   user.Favourites,
		"Autocomplete": autcompleteProducts,
	}
	userMap["Email"] = *user.Email
	log.Print(userMap)

	jsonData, err := json.Marshal(userMap)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonData)
}
