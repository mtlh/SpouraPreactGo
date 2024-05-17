package types

type Product struct {
	ImgURL      string
	Name        string
	Price       float64
	URLSlug     string
	Brand       string
	Collection  *string
	Description string
	Type        string // 'm', 'w', or 'k'
}

type ProductAutocomplete struct {
	URLSlug string
	Name    string
}
