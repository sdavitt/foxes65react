import React from 'react';
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';

const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();

    // function to handle hitting the pay button
    const handlePay = async event => {
        event.preventDefault();

        // add an if statement to make sure stripe has finished loading
        if (!stripe || !elements) {
            // if stripe or the elements of the stripe form haven't finished loading, don't let the button work
            return;
        }

        const payload = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement)
        });
        console.log("[Payment Method]", payload);
    }

    return (
        <div className="container">
            <div className='row'>
                <form onSubmit={handlePay}>
                    <label>
                        Card number
                        <CardNumberElement
                            onReady={() => {
                                console.log("CardNumberElement [ready]");
                            }}
                            onChange={event => {
                                console.log("CardNumberElement [change]", event);
                            }}
                            onBlur={() => {
                                console.log("CardNumberElement [blur]");
                            }}
                            onFocus={() => {
                                console.log("CardNumberElement [focus]");
                            }}
                        />
                    </label>
                    <br/>
                    <label>
                        Expiration date
                        <CardExpiryElement
                            onReady={() => {
                                console.log("CardNumberElement [ready]");
                            }}
                            onChange={event => {
                                console.log("CardNumberElement [change]", event);
                            }}
                            onBlur={() => {
                                console.log("CardNumberElement [blur]");
                            }}
                            onFocus={() => {
                                console.log("CardNumberElement [focus]");
                            }}
                        />
                    </label>
                    <br/>
                    <label>
                        CVC
                        <CardCvcElement
                            onReady={() => {
                                console.log("CardNumberElement [ready]");
                            }}
                            onChange={event => {
                                console.log("CardNumberElement [change]", event);
                            }}
                            onBlur={() => {
                                console.log("CardNumberElement [blur]");
                            }}
                            onFocus={() => {
                                console.log("CardNumberElement [focus]");
                            }}
                        />
                    </label>
                    <br />
                    <button type="submit" className="btn btn-success mt-2" disabled={!stripe}>
                        Pay Now
                    </button>

                </form>
            </div>
        </div>

    )
};

export default Checkout;