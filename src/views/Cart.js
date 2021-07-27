import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Cart extends Component{

    render(){
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
                        {}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Total:</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>$Total</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            </React.Fragment>
        )
    }
}