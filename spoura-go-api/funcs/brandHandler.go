package funcs

import (
	"database/sql"
	"spoura/types"
)

func GetProducts(db *sql.DB, urlSlug string) ([]types.Product, error) {
	rows, err := db.Query("SELECT * FROM Product WHERE brand = ?", urlSlug)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var products []types.Product
	for rows.Next() {
		var product types.Product
		if row_error := rows.Scan(
			&product.ImgURL, &product.Name,
			&product.Price, &product.URLSlug,
			&product.Brand, &product.Collection,
			&product.Type, &product.Description); row_error != nil {
			return nil, row_error
		}
		products = append(products, product)
	}

	if er := rows.Err(); er != nil {
		return nil, er
	}

	return products, nil
}

func GetCollection(db *sql.DB, urlSlug string) ([]types.BrandCollection, error) {
	rows, err := db.Query("SELECT name, urlslug, imgurl FROM Collection WHERE brand = ?", urlSlug)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var collections []types.BrandCollection
	for rows.Next() {
		var collection types.BrandCollection
		if row_error := rows.Scan(
			&collection.Name, &collection.URLSlug,
			&collection.ImgURL); row_error != nil {
			return nil, row_error
		}
		collections = append(collections, collection)
	}

	if er := rows.Err(); er != nil {
		return nil, er
	}

	return collections, nil
}

func GetBrand(db *sql.DB, urlSlug string) (types.Brand, error) {
	rows, err := db.Query("SELECT * FROM Brand WHERE urlslug = ?", urlSlug)
	if err != nil {
		return types.Brand{}, err
	}
	defer rows.Close()

	var brand types.Brand
	for rows.Next() {
		if row_error := rows.Scan(
			&brand.Name, &brand.Description,
			&brand.ImgURL, &brand.URLSlug); row_error != nil {
			return types.Brand{}, row_error
		}
	}

	if er := rows.Err(); er != nil {
		return types.Brand{}, er
	}

	return brand, nil
}
