export type cartproduct = {
	price: number,
	urlslug: string,
	imgurl: string,
	name: string,
	size: string,
	quantity: string
}

export type favouriteproduct = {
	ImgURL: string,
	Name: string,
	Price: number,
	URLSlug: string,
	Brand: string,
	Collection: null | string,
	Description: string,
	Type: string
}

export type user = {
	ID: null | number,
	Nickname: null | string,
	Cart: null | cartproduct[],
	Favourites: null | favouriteproduct[],
	Email: null | string,
	Autocomplete: null | AutocompleteProduct[]
}

export interface UserProp {
	user: user,
	setuser: any
}
export interface UserOnlyProp {
	user: user,
}

export type AutocompleteProduct = {
	ImgURL: string,
	Name: string
}