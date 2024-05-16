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

func BrandHandler(w http.ResponseWriter, r *http.Request, brandSlug string) {
	db := db.InitDB()
	defer db.Close()

	productChan := make(chan []types.Product)
	collectionChan := make(chan []types.BrandCollection)
	brandChan := make(chan types.Brand)

	go func() {
		products, err := funcs.GetProducts(db, brandSlug)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		productChan <- products
	}()

	go func() {
		collections, err := funcs.GetCollection(db, brandSlug)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		collectionChan <- collections
	}()

	go func() {
		brand, err := funcs.GetBrand(db, brandSlug)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		brandChan <- brand
	}()

	// Wait for all goroutines to finish and receive results
	products := <-productChan
	collections := <-collectionChan
	brand := <-brandChan

	brand.Products = products
	brand.Collection = collections

	jsonData, err := json.Marshal(brand)
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

func MainProductHandler(w http.ResponseWriter, r *http.Request) {

	parts := strings.Split(r.URL.Path, "/")
	var urlslug string

	if len(parts) != 4 || parts[3] == "" {
		http.Error(w, "Slug not found in URL -> follow /api/method/URLSLUG", http.StatusBadRequest)
		return
	} else {
		urlslug = funcs.CleanString(parts[3])
	}

	if parts[2] == "brand" {
		BrandHandler(w, r, urlslug)
	} else if parts[2] == "product" {
		ProductHandler(w, r, urlslug)
	} else {
		CollectionHandler(w, r, urlslug)
	}

}

func ProductHandler(w http.ResponseWriter, r *http.Request, urlslug string) {

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

func CollectionHandler(w http.ResponseWriter, r *http.Request, collectionSlug string) {
	db := db.InitDB()
	rows, err := db.Query("SELECT name, description, imgURL, urlslug FROM Collection WHERE urlslug = ?", collectionSlug)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	defer db.Close()

	var collection types.Collection
	for rows.Next() {
		if err := rows.Scan(
			&collection.Name, &collection.Description,
			&collection.ImgURL, &collection.URLSlug); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	if err := rows.Err(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	rows, err = db.Query("SELECT * FROM Product WHERE collection = ?", collectionSlug)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

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

	collection.Products = products

	jsonData, err := json.Marshal(collection)
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
