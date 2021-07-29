import React from 'react';
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const Checkout = (props) => {
    const stripe = useStripe();
    const elements = useElements();

    // use a react state hook to control what is displayed
    // a state hook is essentially the same as the .setState() except its intended for functional components instead of class components (this checkout is a functional component)
    const [showPay, setShowPay] = React.useState(true);
    const [showForm, setShowForm] = React.useState(true);
    // set up confirm number
    let [confirm_num, setConfirm_num] = React.useState('');
    
    const payAPI = async (amount) => {
        let request = await axios.post('https://foxes65api.herokuapp.com/pay', {amnt:amount*100})
        return request.data
    }

    const getPaymentIntent = async (amount) => {
        let secret = await payAPI(amount);
        return secret
    }

    // function to handle hitting the pay button
    const handlePay = async event => {
        event.preventDefault();
        setShowPay(false);

        let secret = await getPaymentIntent(props.total);
        // add an if statement to make sure stripe has finished loading
        if (!stripe || !elements) {
            // if stripe or the elements of the stripe form haven't finished loading, don't let the button work
            return;
        }

        const result = await stripe.confirmCardPayment(secret.client_secret, {
            payment_method: {
                type: "card",
                card: elements.getElement(CardNumberElement),
                billing_details: {
                    name: 'Doctor Algernop Krieger'
                }
            }
        });
        console.log("[Payment Method]", result);

        if (result.error) {
            console.log(result.error.message);
            setShowForm('error');
        }
        else {
            if (result.paymentIntent.status === 'succeeded') {
                console.log('Hey this payment went through... good work');
                setConfirm_num(result.paymentIntent.id);
                setShowForm(false);
            }
        }

    }

    return (
        <div className="container">
            <div className='row offset-3'>
                <div className='col-3'>
                    <h3>Your total:</h3>
                    <br />
                    <h4>${props.total.toFixed(2)}</h4>
                </div>
                <div className='col-3'>
                    { showForm ?
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
                        <br className='mt-2'/>
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
                        <br />
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
                        { showPay ?
                        <button type="submit" className="btn btn-success mt-2" disabled={!stripe}>
                            Pay Now
                        </button>
                        :
                        <button className="btn btn-info mt-2" disabled={true}> Processing... </button>
                    }
                    </form>
                    : showForm === 'error' ?
                    <h2> There was an issue with your payment. Please try again. </h2>
                    :
                    <React.Fragment>
                    <h2> Thank you for your purchase!</h2>
                    <p>Your confirmation number is: {confirm_num}</p>
                    </React.Fragment>
                }
                </div>
            </div>
        </div>

    )
};

export default Checkout;