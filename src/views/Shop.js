import React, { Component } from 'react';
import Product from '../components/Product';
import axios from 'axios';
import firebase from "firebase/app";
import "firebase/auth";
import { IfFirebaseAuthed, IfFirebaseUnAuthed } from '@react-firebase/auth';

export default class Shop extends Component {
    constructor() {
        super();
        /*
        My store's products will be stored in the Shop component's state as an array
        Each product will be an object with the following properties
        id
        name
        price
        description
        image
        */
        this.state = {
            products: []
        }
        this.setProducts();
    }

    // Add in an api call function 
    shopAPIcall = async () => {
        let response = await axios.get('https://foxes65api.herokuapp.com/products')
        return response.data
    }

    // and a function to call that api function/set the resulting data as my products
    setProducts = async () => {
        let data = await this.shopAPIcall()
        this.setState({ products: data })
    }


    render() {
        return (
            <React.Fragment>
                <IfFirebaseAuthed>
                    <h1>Welcome to the Coding Temple Exotic Pet Shop</h1>
                    <div className='row'>
                        {this.state.products.map(product => <Product key={product.id} product={product} addToCart={this.props.addToCart} />)}
                    </div>
                </IfFirebaseAuthed>
                <IfFirebaseUnAuthed>
                    <h1> Please sign-in in the top right corner to shop with us. Thanks! </h1>
                </IfFirebaseUnAuthed>
            </React.Fragment>



        )
    }

}