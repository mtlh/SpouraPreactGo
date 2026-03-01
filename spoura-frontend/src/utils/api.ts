// Centralized API URL constants
export const API_BASE_URL = 'https://spoura-go-api.vercel.app/api';

export const API_ENDPOINTS = {
    product: (slug: string) => `${API_BASE_URL}/product/${slug}`,
    brand: (slug: string) => `${API_BASE_URL}/brand/${slug}`,
    collection: (slug: string) => `${API_BASE_URL}/collection/${slug}`,
    shop: (query: string) => `${API_BASE_URL}/shop/${query}`,
    featured: `${API_BASE_URL}/featured`,
    cart: {
        add: (slug: string, quantity: number, size: number, session: string) =>
            `${API_BASE_URL}/cart/add/${slug}/${quantity}/${size}/${session}`,
        remove: (slug: string, quantity: number, size: number, session: string) =>
            `${API_BASE_URL}/cart/remove/${slug}/${quantity}/${size}/${session}`,
    },
    favourite: (slug: string, session: string) => `${API_BASE_URL}/favourite/${slug}/${session}`,
    session: {
        create: `${API_BASE_URL}/createsession`,
        get: (session: string) => `${API_BASE_URL}/session/${encodeURIComponent(session)}`,
    },
    user: {
        order: `${API_BASE_URL}/user/order`,
        signup: `${API_BASE_URL}/user/signup`,
        login: `${API_BASE_URL}/user/login`,
        logout: `${API_BASE_URL}/user/logout`,
    },
    paymentIntent: (session: string) => `${API_BASE_URL}/paymentintent/${encodeURIComponent(session)}`,
    clearCart: (session: string) => `${API_BASE_URL}/clearcart/${encodeURIComponent(session)}`,
};
