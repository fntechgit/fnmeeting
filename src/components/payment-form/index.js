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

import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            card: undefined
        }
    }
    
    setCardElement(el){
        this.setState({card: el})
    }
    
    render() {
        const {price, currency} = this.props ;

        const style = {
            base: {
                fontSize: '16px',
                color: "#32325d",
            }
        };

        let cost = new Intl.NumberFormat(Intl.getCanonicalLocales(), { style: 'currency', currency: currency }).format(price)
        
        return (
            <div className="checkout">
                <CardElement style={style} onReady={(el) => {this.setCardElement(el)}} />
                <button className={'btn btn-warning btn-lg btn-block'} onClick={(e)=>{this.props.submit(this.state.card, this.props.stripe, this.props.clientSecret)}}>Pay {cost}</button>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);