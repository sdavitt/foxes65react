import React, { Component } from 'react';

export default class F1 extends Component {
    render() {
        const drivers = this.props.drivers;
        return (
            <div>
                <h1> Formula 1 Racer Data </h1>
                <hr />
                <h3> From the Ergast API </h3>
                <hr />
                <form name="apiCallForm" id="apiCallForm" onSubmit={(event) => this.props.f1APIdata(event)}>
                    <label for="season">What season?</label>
                    <input type="text" name="season" id="season" />
                    <br />
                    <label for="round">What round?</label>
                    <input type="text" name="round" id="round" />
                    <br />
                    <button type="submit" id="submitButton">Submit</button>
                </form>
                <br />
                <table className="table">
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Number</th>
                            <th>Team</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        { drivers.map( (driver, index) => {
                            return <tr key={index}>
                                <td>{driver.pos}</td>
                                <td>{driver.code}</td>
                                <td>{driver.name}</td>
                                <td>{driver.num}</td>
                                <td>{driver.team}</td>
                                <td>{driver.points}</td>
                                </tr>
                        }) }
                    </tbody>
                </table>
            </div>
        )
    }
}