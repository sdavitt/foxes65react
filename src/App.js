import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import About from './views/About';
import Contact from './views/Contact';
import F1 from './views/F1';
import axios from 'axios';
import Shop from './views/Shop';
import Cart from './views/Cart';


export default class App extends Component {
  constructor(){
    super();

    this.state = {
      name: 'Sam Davitt',
      students: ['Todd', 'Marwa', 'Colby', 'Michael', 'Emily', 'Aaron'],
      drivers: [],
      cart: []
      // my cart will have products in it
      // each cart will be an object containing:
      // { name: p.name, product: product, quantity: __ }
    }
  }

  f1APIcall = async (season,round) => {
    let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`);
    return response.data
  };
  
  f1APIdata = async (event) => {
    event.preventDefault();
    let data = await this.f1APIcall(event.target[0].value, event.target[1].value);
    data = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    console.log(data);

    // let's take that data and actually organize it and put it in our html
    // i started with my classic api principle of "if I can do it for one, I can do it for many"
    let ds = [];
    for(let i = 0; i<data.length; i++){
        let driver = {
          pos: data[i].position,
          num: data[i].Driver.permanentNumber,
          code: data[i].Driver.code,
          name: `${data[i].Driver.givenName} ${data[i].Driver.familyName}`,
          team: data[i].Constructors[0].name,
          points: data[i].points
        }; // organizes the data for a single racer
        console.log(driver);
        ds.push(driver);
    }
    this.setState({drivers: ds})

    event.target.reset(); // reset form data so we can resubmit
  }

  render() {
    console.log(this.state.drivers);
    return (
      <div>
        <Navbar />
        <main className="container">
          <Switch>
            <Route exact path='/' render={() => <Home title={'Foxes65 | Home'} newprop={'Hi Colby'} name={this.state.name} students={this.state.students}/>}/>
            <Route path='/about' render={() => <About title={'Foxes65 | About'} name={this.state.name}/>}/>
            <Route path='/contact' render={() => <Contact title={'Foxes65 | Contact'} />}/>
            <Route path='/F1' render={() => <F1 f1APIdata={this.f1APIdata} drivers={this.state.drivers}/>}/>
            <Route path='/shop' render={() => <Shop />}/>
            <Route path='/cart' render={() => <Cart />}/>
          </Switch>
        </main>
      </div>
    )
  }
};