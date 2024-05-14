package types

type User struct {
	ID         int
	Email      *string
	Password   *string
	Nickname   string
	Cart       []CartItem
	Favourites []FavouriteItem
}
