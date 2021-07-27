import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Product extends Component {

    render() {
        console.log(this.props.product);
        let p = this.props.product;
        return (
            <div class="card" style={{width: 18+'rem', marginRight: 10+'px'}}>
                <img src={p.image} class="card-img-top product-image" alt="animal" />
                    <div class="card-body">
                        <h5 class="card-title">{p.name}</h5>
                        <p class="card-text">{p.desc}</p>
                        <a href="#" class="btn btn-primary">${p.price.toFixed(2)}</a>
                    </div>
            </div>
                )
    }
}