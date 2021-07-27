import React, {Component} from 'react';


export default class About extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h1> This is the about page. </h1>
                <p> We are creating our first React application. </p>
            </div>
        )
    }
};