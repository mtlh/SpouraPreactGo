package funcs

import (
	"spoura/types"
)

func PaginateProducts(products []types.Product, page int) []types.Product {
	start := (page - 1) * 12
	end := start + 12

	if start >= len(products) {
		return []types.Product{}
	}

	if end > len(products) {
		end = len(products)
	}

	return products[start:end]
}
