import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
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
                        { this.props.students.map( (student, index) => {
                            return <tr key={index}><td>{student}</td></tr>
                        }) }
                    </tbody>
                </table>
            </div>
        )
    }
};