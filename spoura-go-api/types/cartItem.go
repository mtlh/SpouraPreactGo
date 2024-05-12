package types

type CartItem struct {
	Price    float64 `json:"price"`
	URLslug  string  `json:"urlslug"`
	ImgURL   string  `json:"imgurl"`
	Name     string  `json:"name"`
	Size     string  `json:"size"`
	Quantity string  `json:"quantity"`
}
