package types

type User struct {
	ID         int
	Nickname   string
	Cart       []CartItem
	Favourites []FavouriteItem
}
