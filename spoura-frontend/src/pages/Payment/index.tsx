import { useEffect } from "preact/hooks"
import { getCookiesWithValue } from "../../components/Auth";

export function Payment () {
    if (new URLSearchParams(window.location.search).get("redirect_status") == "succeeded") {
        useEffect(() => {
            const clearCart = async () => {
                const result = await fetch("https://spoura-go-api.vercel.app/api/clearcart/" + encodeURIComponent(getCookiesWithValue("spoura_session")));
                if (!result.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    window.location.href = "/payment?redirect_status=succeeded";
                }
            }
            if (new URLSearchParams(window.location.search).get("payment_intent") != null && new URLSearchParams(window.location.search).get("payment_intent") != "") {
                clearCart();
            }
        }, []);
        return (
            <div class="text-center mt-20">
                <h1 class="text-center font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900">Payment Success</h1>
                <p>Thank you for your purchase!</p>
                <a href="/" class="text-black underline mt-2">Go back to homepage</a>
            </div>
        )
    } else if (new URLSearchParams(window.location.search).get("redirect_status") == "false") {
        return (
            <div class="text-center mt-20">
                <h1 class="text-center font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900">Payment Failed</h1>
                <p>Your payment failed. Please try again.</p>
                <a href="/" class="text-black underline mt-2">Go back to homepage</a>
            </div>
        )
    } else {
        return (
            <div class="text-center mt-20">
                <h1 class="text-center font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900">Payment Processing</h1>
                <p>You have no ongoing payment.</p>
                <a href="/" class="text-black underline mt-2">Go back to homepage</a>
            </div>
        )
    }
}