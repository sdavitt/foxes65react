import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Cart extends Component{
    getUniqueCart = (cart) =>{
        let uniqueCart = [];
        let ids = new Set();
        // fill uniqueCart with items from cart
        for(let i=0; i<cart.length; i++){
            if(! ids.has(cart[i].id)){
                uniqueCart.push(cart[i]);
                ids.add(cart[i].id);
            }
        }
        return uniqueCart
    }

    getQuantity = (id) => {
        let quant = 0;
        for (let i of this.props.cart){
            if (i.id === id){
                quant++;
            }
        }
        return quant
    }

    render(){
        const uniqueCart = this.getUniqueCart(this.props.cart);
        return (
            <React.Fragment>
            <h1>Your cart:</h1>
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uniqueCart.map(p => {
                            let quantity = this.getQuantity(p.id);
                            let subtotal = (quantity*p.price).toFixed(2);
                            return <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.name}</td>
                                <td>{quantity}</td>
                                <td>${p.price.toFixed(2)}</td>
                                <td>${subtotal}</td>
                                <td>
                                    <button onClick={() => this.props.removeFromCart(p)} className="btn-sm btn-danger">Remove</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Total:</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>${this.props.total.toFixed(2)}</td>
                            <td>
                                { this.props.total !== 0 ?
                                    <Link to='/checkout'><button className="btn btn-success">Checkout</button></Link>
                                    :
                                    <Link to='/shop'><button className="btn btn-info">Shop</button></Link>
                                }
                                
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            </React.Fragment>
        )
    }
}