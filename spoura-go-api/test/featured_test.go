package main

import (
	"strconv"
	"testing"
)

// TestFeaturedReturnNumber tests the number of products returned (1-10)
func TestFeaturedReturnNumber(t *testing.T) {
	for x := 1; x < 10; x++ {
		data := setupJSON("https://spoura-go-api.vercel.app/api/featured/"+strconv.Itoa(x), t)
		if len(data) != x {
			t.Errorf("Number of products returned is not %d: %d", x, len(data))
		}
	}
}

// TestFeaturedDefaultReturnNumber tests the default number of products returned
func TestFeaturedDefaultReturnNumber(t *testing.T) {
	data := setupJSON("https://spoura-go-api.vercel.app/api/featured/", t)
	if len(data) != 3 {
		t.Errorf("Number of products returned is not %d: %d", 3, len(data))
	}
}

// TestFeaturedProductFields tests the fields of the products returned
func TestFeaturedProductFields(t *testing.T) {
	data := setupJSON("https://spoura-go-api.vercel.app/api/featured/", t)
	for _, product := range data {
		if product["Name"] == nil {
			t.Error("Product has no name.")
		}
		if product["Price"] == nil {
			t.Error("Product has no price.")
		}
		if product["ImgURL"] == nil {
			t.Error("Product has no image.")
		}
		if product["Description"] == nil {
			t.Error("Product has no description.")
		}
		if product["Type"] == nil {
			t.Error("Product has no type.")
		}
		// if product["Collection"] == nil {
		// 	t.Error("Product has no collection.")
		// }
		if product["URLSlug"] == nil {
			t.Error("Product has no url slug.")
		}
	}
}
