import { getCookiesWithValue } from "./Auth";
import { API_ENDPOINTS } from "../utils/api";

export async function FavouriteToggle (productSlug: string) {
    const currentCookieval = getCookiesWithValue("spoura_session")
    return await RequestToggle(currentCookieval, productSlug)
}

async function RequestToggle(currentCookieval: string, productSlug: string) {
    try {
        const response = await fetch(API_ENDPOINTS.favourite(productSlug, currentCookieval));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
    }
}
