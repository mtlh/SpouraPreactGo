package types

type Brand struct {
	Name        string `json:"name"`
	URLSlug     string `json:"urlslug"`
	Description string `json:"description"`
	ImgURL      string `json:"imgurl"`
	Collection  []BrandCollection
	Products    []Product
}
