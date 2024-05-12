package api

import (
	"encoding/json"
	"net/http"
	"spoura/db"
	"spoura/funcs"
	"spoura/types"
	"strings"

	_ "github.com/tursodatabase/libsql-client-go/libsql"
)

// Get random 6 product records

func ProductHandler(w http.ResponseWriter, r *http.Request) {

	parts := strings.Split(r.URL.Path, "/")
	var urlslug string

	if len(parts) != 4 || parts[3] == "" {
		http.Error(w, "Slug not found in URL -> follow /api/product/URLSLUG", http.StatusBadRequest)
		return
	} else {
		urlslug = funcs.CleanString(parts[3])
	}

	db := db.InitDB()
	rows, err := db.Query("SELECT * FROM Product WHERE urlslug = ?", urlslug)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	defer db.Close()

	var product types.Product
	for rows.Next() {
		if err := rows.Scan(
			&product.ImgURL, &product.Name,
			&product.Price, &product.URLSlug,
			&product.Brand, &product.Collection,
			&product.Type, &product.Description); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	if err := rows.Err(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	jsonData, err := json.Marshal(product)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonData)
}
