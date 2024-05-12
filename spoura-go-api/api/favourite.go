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

func FavouriteHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	parts := strings.Split(r.URL.Path, "/")
	keyString := strings.Join(parts[4:], "/")

	if len(parts) < 3 {
		http.Error(w, "URL not structured correctly -> follow /api/favourite/product/key", http.StatusBadRequest)
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
	rows, err := db.Query("SELECT User.id, User.favourites FROM Session JOIN User ON Session.userid = User.id WHERE Session.key = ?", keyString)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var favouritesJSON string
	var userID int
	var favourites []types.FavouriteItem
	for rows.Next() {
		if err := rows.Scan(&userID, &favouritesJSON); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		json.Unmarshal([]byte(favouritesJSON), &favourites)
	}
	defer rows.Close()

	if err := rows.Err(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	rows, err = db.Query("SELECT Name, Price, URLSlug, ImgURL FROM Product WHERE urlslug = ?", parts[3])
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var NewItem types.FavouriteItem
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

	// Check if product exists and remove it if exists
	favourites2 := favourites
	didremove := false
	for i, item := range favourites {
		if item.URLslug == parts[3] {
			favourites2 = append(favourites[:i], favourites[i+1:]...)
			didremove = true
			break
		}
	}

	// Append newest product
	if len(favourites) == len(favourites2) && !didremove {
		favourites2 = append(favourites2, NewItem)
	}

	jsonData, err := json.Marshal(favourites2)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	_, err = db.Exec("UPDATE User SET favourites = ? WHERE id = ?", jsonData, userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer db.Close()

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonData)
}
