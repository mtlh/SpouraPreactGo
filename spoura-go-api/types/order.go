package types

type Order struct {
	ProductURLSlug string `json:"producturlslug"`
	Quantity       int    `json:"quantity"`
	Size           int    `json:"size"`
	Date           string `json:"date"`
}
