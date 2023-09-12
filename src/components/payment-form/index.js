/**
 * Copyright 2017 OpenStack Foundation
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

import React from 'react';
import {useElements, useStripe, CardElement} from "@stripe/react-stripe-js";

const CheckoutForm = ({price, currency, userName, payBooking}) => {
    const stripe = useStripe();
    const elements = useElements();
    const cost = new Intl.NumberFormat(Intl.getCanonicalLocales(), { style: 'currency', currency: currency }).format(price)
    const style = {
        base: {
            fontSize: '16px',
            color: "#32325d",
        }
    };

    const handlePay = async (event) => {
        event.preventDefault();

        if (!stripe) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const { error, token } = await stripe.createToken(cardElement, {name: userName});

        if (token) {
            payBooking(token, stripe);
        } else if (error) {
            console.log('error', error);
        }

    };

    return (
      <div className="checkout">
          <CardElement options={{ style }} />
          <button className={'btn btn-warning btn-lg btn-block'} onClick={handlePay}>Pay {cost}</button>
      </div>
    );
}

export default CheckoutForm;