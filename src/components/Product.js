import React, { Component } from 'react';


export default class Product extends Component {

    render() {
        let p = this.props.product;
        return (
            <div className="card" style={{width: 18+'rem', marginRight: 10+'px'}}>
                <img src={p.img} className="card-img-top product-image" alt="animal" />
                    <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.desc}</p>
                        <button onClick={() => this.props.addToCart(p)} className="btn btn-info">${p.price.toFixed(2)}</button>
                    </div>
            </div>
                )
    }
}