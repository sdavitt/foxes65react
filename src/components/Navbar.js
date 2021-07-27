import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Foxes65 React</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/F1">F1 Driver Data</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/shop">Exotic Pet Store</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav mb-2 mb-lg-0 justify-content-end">
                        <li className="nav-item btn btn-info p-0">
                            <Link className="nav-link" to="/cart">
                            <i className="fa fa-shopping-cart"></i>
                            <span className=""> | {this.props.cart.length} | ${this.props.total.toFixed(2)} </span>
                            </Link>
                        </li>
                    </ul>
                    </div>
                </div>
                </nav>
            </div>
                )
    }
}