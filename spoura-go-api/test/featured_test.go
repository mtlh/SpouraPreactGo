package main

import (
	"strconv"
	"testing"
)

func TestFeaturedReturnNumber(t *testing.T) {
	for x := 1; x < 10; x++ {
		data := setup("https://spoura-go-api.vercel.app/api/featured/" + strconv.Itoa(x))
		if len(data) != x {
			t.Errorf("Number of products returned is not %d: %d", x, len(data))
		}
	}
}

func TestFeaturedDefaultReturnNumber(t *testing.T) {
	data := setup("https://spoura-go-api.vercel.app/api/featured/")
	if len(data) != 3 {
		t.Errorf("Number of products returned is not %d: %d", 3, len(data))
	}
}

func TestFeaturedProductFields(t *testing.T) {
	data := setup("https://spoura-go-api.vercel.app/api/featured/")
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
