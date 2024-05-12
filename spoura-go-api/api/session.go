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
	rows, err := db.Query("SELECT User.id, User.nickname, User.cart, User.favourites FROM Session JOIN User ON Session.userid = User.id WHERE Session.key = ?", keyString)
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
			&user.ID, &user.Nickname,
			&cartJSON, &favouritesJSON); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		json.Unmarshal([]byte(cartJSON), &user.Cart)
		json.Unmarshal([]byte(string(favouritesJSON)), &user.Favourites)
	}

	if err := rows.Err(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	jsonData, err := json.Marshal(user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonData)
}
