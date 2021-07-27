import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Product from '../components/Product';

export default class Shop extends Component{
    constructor(){
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
            products: [
                {id: 1, name: 'Fennec Fox', price: 4500, desc: 'A small African desert fox with giant ears.', image: 'https://animals.sandiegozoo.org/sites/default/files/2016-10/fennec_fox_0.jpg'},
                {id: 2, name: 'Ocelot', price: 3000, desc: 'A fox-eared cat named Babou. Previously owned by Salvador Dali.', image: 'https://decider.com/wp-content/uploads/2017/02/archer-ocelot.jpg?quality=80&strip=all&w=978'},
                {id: 3, name: 'Qokka', price: 1500, desc: 'Always smiling. :)', image: 'https://critter.science/wp-content/uploads/2020/05/quokka1.png'},
                {id: 4, name: 'Petite Lap Giraffe', price: 99999, desc: 'The pinnacle of luxury animals.', image: 'https://via.placeholder.com/150'}
            ]
        }
    }


    render() {
        return(
            <React.Fragment>
               <h1>Welcome to the Coding Temple Exotic Pet Shop</h1>
               <div class='row'>
                   {this.state.products.map( product => <Product key={product.id} product={product}/>)}
               </div>
            </React.Fragment>
            

            
        )
    }

}