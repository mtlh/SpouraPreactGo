package types

type Collection struct {
	Name        string    `json:"name"`
	Description string    `json:"description"`
	ImgURL      string    `json:"imgURL"`
	URLSlug     string    `json:"urlslug"`
	Products    []Product `json:"products"`
}

type BrandCollection struct {
	Name    string `json:"name"`
	ImgURL  string `json:"imgURL"`
	URLSlug string `json:"urlslug"`
}
