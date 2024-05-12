import { getCookiesWithValue } from "./Auth";

export async function FavouriteToggle (productSlug) {
    const currentCookieval = getCookiesWithValue("spoura_session")
    return await RequestToggle(currentCookieval, productSlug)
}

async function RequestToggle(currentCookieval: string, productSlug: string) {
    try {
        const response = await fetch('https://spoura-go-api.vercel.app/api/favourite/' + productSlug + "/" + currentCookieval );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
    }
}