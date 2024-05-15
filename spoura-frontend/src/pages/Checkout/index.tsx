import { useEffect, useState } from "preact/hooks";
import { UserOnlyProp } from "../../components/types";
import { PaymentElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';
import { getCookiesWithValue } from "../../components/Auth";

const stripePromise = loadStripe('pk_test_51MLTm6IF7mOcWg9ksTJrtLiO1hxVrMOai2ZoLn6mEAvzh9OeqBHOm0UzUGlcI4VZw5rcSHUL946uFcdCvEyDBf2300HP4Z1V9F');

export function Checkout ({user}: UserOnlyProp) {

    const [clientSecret, setClientSecret] = useState(null);
    const [cartTotal, setCartTotal] = useState<number>(0);
    const [itemCount, setItemCount] = useState<number>(0);

    useEffect(() => {
        const getOptions = async () => {
            const result = await fetch("https://spoura-go-api.vercel.app/api/paymentintent/" + encodeURIComponent(getCookiesWithValue("spoura_session")));
            const json = await result.json();
            setClientSecret(json.clientSecret);
            setCartTotal(json.cartTotal);
            setItemCount(json.itemCount);
        }
        getOptions();
    }, []);

    return (
        <>
            <div class="max-w-7xl m-auto pt-8 min-h-screen gap-6">
                <div class="relative p-2 justify-center">
                    {user.Cart ?
                        <h1 class="text-center font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900">Checkout - {itemCount} Item(s)</h1>
                    :
                        <h1 class="text-center font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900">Checkout - 0 Item(s)</h1>
                    }
                    <p class="text-2xl my-2 m-auto text-center">Subtotal: £{cartTotal}</p>
                    <a href="/cart"><h2 class="text-center my-2 font-base underline text-xl hover:scale-110 transition ease-in-out delay-15 duration-300" >Back to cart</h2></a>
                </div>
                <div class="relative p-2 justify-center">
                    {
                        clientSecret ?
                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <CheckoutForm />
                            </Elements>
                            :
                            <p class="text-center">
                                Please wait while we fetch your payment details...
                            </p>
                    }
                </div>
            </div>
        </>
    )
}

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

         const result = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url:  "https://spoura.mtlh.dev/payment",
            },
        });

        if (result.error) {
            // Show error to your customer (for example, payment details incomplete)
            console.log(result.error.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} class="flex flex-col justify-end w-full">
                <PaymentElement />
                <button disabled={!stripe} class="btn bg-gradient-to-r from-blue-500 to-blue-900 border-0 rounded-lg m-auto w-full text-center mt-2">Pay</button>
            </form>
            <div class="text-gray-400 text-left mt-4 text-md">
                <p class="underline text-red-400">Please note that this is a test payment and you will not be charged.</p>
                <p class="text-sm">Success card: 4242 4242 4242 4242</p>
                <p class="text-sm">Fail card: 4000 0000 0000 0002 </p>
            </div>
        </>
    )
  };