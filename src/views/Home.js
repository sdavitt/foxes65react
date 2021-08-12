import React, { Component } from 'react';
import firebase from "firebase/app";

export default class Home extends Component {
    state = {
        grab: 0
    };
    render() {
        const name = this.props.name;

        return (

            <div>
                <h1>{this.props.title}</h1>
                <h1> Hello, Foxes. My Name is {name} </h1>
                <p> The quick brown fox jumped over the lazy dog. </p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.students.map((student, index) => {
                            return <tr key={index}><td>{student}</td></tr>
                        })}
                    </tbody>
                </table>
                <hr></hr>
                <button onClick={()=> this.props.checkdb()}> DB Test Button </button>
            </div>
        )
    }
};