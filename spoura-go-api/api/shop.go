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

// Return products according to query

func ShopHandler(w http.ResponseWriter, r *http.Request) {

	parts := strings.Split(r.URL.Path, "/")
	var query string

	if len(parts) != 4 || parts[3] == "" {
		query = "%"
	} else {
		query = "%" + funcs.CleanWithQueryString(parts[3]) + "%"
	}

	db := db.InitDB()
	rows, err := db.Query("SELECT * FROM Product WHERE name LIKE ?", query)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	defer db.Close()

	var products []types.Product
	for rows.Next() {
		var product types.Product
		if err := rows.Scan(
			&product.ImgURL, &product.Name,
			&product.Price, &product.URLSlug,
			&product.Brand, &product.Collection,
			&product.Type, &product.Description); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		products = append(products, product)
	}

	if err := rows.Err(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	jsonData, err := json.Marshal(products)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	if len(jsonData) == 4 {
		w.Write([]byte("[]"))
	} else {
		w.Write(jsonData)
	}
}
