import { getCookiesWithValue } from "./Auth";
import { API_ENDPOINTS } from "../utils/api";

export async function AddToCart (productSlug: string, quantity: number, size: number) {
    const currentCookieval = getCookiesWithValue("spoura_session")
    return await Add(currentCookieval, productSlug, quantity, size)
}

export async function RemoveFromCart (productSlug: string, quantity: number, size: number) {
    const currentCookieval = getCookiesWithValue("spoura_session")
    return await Remove(currentCookieval, productSlug, quantity, size)
}

async function Add(currentCookieval: string, productSlug: string, quantity: number, size: number) {
    try {
        const response = await fetch(API_ENDPOINTS.cart.add(productSlug, quantity, size, currentCookieval));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
    }
}

async function Remove(currentCookieval: string, productSlug: string, quantity: number, size: number) {
    try {
        const response = await fetch(API_ENDPOINTS.cart.remove(productSlug, quantity, size, currentCookieval));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
    }
}
