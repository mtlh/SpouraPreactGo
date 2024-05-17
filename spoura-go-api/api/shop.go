package api

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"sort"
	"spoura/db"
	"spoura/funcs"
	"spoura/types"
	"strconv"
	"strings"

	_ "github.com/tursodatabase/libsql-client-go/libsql"
)

// Return products according to query

func ShopHandler(w http.ResponseWriter, r *http.Request) {

	parts := strings.Split(r.URL.Path, "/")
	var query string

	if (len(parts) != 4) || parts[3] == "" {
		query = "%"
	} else {
		query = "%" + funcs.CleanWithQueryString(parts[3]) + "%"
	}

	db := db.InitDB()
	var rows *sql.Rows
	var err error

	typeString := r.URL.Query().Get("type")
	if typeString == "all" || typeString == "" {
		rows, err = db.Query("SELECT * FROM Product WHERE name LIKE ?", query, typeString)
	} else {
		rows, err = db.Query("SELECT * FROM Product WHERE name LIKE ? AND type = ?", query, typeString)
	}

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

	sortString := r.URL.Query().Get("sort")
	if sortString == "lowHigh" {
		sort.Slice(products, func(i, j int) bool {
			return products[i].Price < products[j].Price
		})
	} else if sortString == "highLow" {
		sort.Slice(products, func(i, j int) bool {
			return products[i].Price > products[j].Price
		})
	}

	page := 1
	pageString := r.URL.Query().Get("page")
	if pageString != "" {
		page, err = strconv.Atoi(pageString)
		if err != nil || page < 1 {
			page = 1
		}
	}
	resultCount := len(products)
	products = funcs.PaginateProducts(products, page)

	data := map[string]interface{}{
		"products":    products,
		"page":        page,
		"resultCount": resultCount,
	}

	jsonData, err := json.Marshal(data)
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
