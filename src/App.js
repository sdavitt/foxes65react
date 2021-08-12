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
import Checkout from './views/Checkout';
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { IfFirebaseAuthedAnd } from '@react-firebase/auth';



export default class App extends Component {
  constructor(){
    super();

    this.state = {
      name: 'Sam Davitt',
      students: ['Todd', 'Marwa', 'Colby', 'Michael', 'Emily', 'Aaron'],
      drivers: [],
      cart: [],
      total: 0,
      dbval: ''
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

  addToCart = (product) => {
    this.state.cart.push(product);
    this.setState({total: this.state.total+product.price});
    this.setState();
    this.setUserCart();
  }

  removeFromCart = (product) => {
    for(let i=0; i<this.state.cart.length; i++){
      if( this.state.cart[i].id === product.id){
        this.state.cart.splice(i,1);
        break;
      }
    }
    this.setState({total: this.state.total-product.price});
    this.setState();
    this.setUserCart();
  }

  // let's try to connect to our database
  // create a database ref
  db = firebase.database();

  // testing function
  checkdb = () => {
    let data = this.db.ref('Users/').get().then((snapshot) =>{
      if (snapshot.exists()){
        console.log(firebase.auth().currentUser.uid)
        console.log(snapshot.val());
        this.setState({dbval: snapshot.val()});
      }
      else{
        console.log('no data');
      }
    }).catch((error) => {
      console.error(error);
    });
    return data
  }

  // function to update a user's cart in our database
  setUserCart = () => {
    let updateCart = {};
    updateCart['Users/' + firebase.auth().currentUser.uid] = this.state.cart;
    return this.db.ref().update(updateCart);
  }

  // gets the total of our current state cart
  getTotal = () => {
    let total = 0.00;
    this.state.cart.forEach(element => total += element.price);
    return total
  }

  // updates our local cart from the firebase realtime database
  getUserCart = () => {
    let path = 'Users/' + firebase.auth().currentUser.uid
    let data = this.db.ref(path).get().then((snapshot) =>{
      if (snapshot.exists()){
        console.log(firebase.auth().currentUser.uid)
        console.log(snapshot.val());
        this.setState({cart: snapshot.val()});
        this.setState({total: this.getTotal()});
      }
      else{
        console.log('no cart data for this user');
      }
    }).catch((error) => {
      console.error(error);
    })
    return data
  }


  render() {
    return (
      <div>
        <IfFirebaseAuthedAnd filter={() => {if(this.state.cart.length === 0){this.getUserCart()}}}>
        </IfFirebaseAuthedAnd>
        
        <Navbar cart={this.state.cart} total={this.state.total} getUserCart={this.getUserCart}/>
        <main className="container">
          <Switch>
            <Route exact path='/' render={() => <Home title={'Foxes65 | Home'} newprop={'Hi Colby'} name={this.state.name} students={this.state.students} checkdb={this.checkdb}/>}/>
            <Route path='/about' render={() => <About title={'Foxes65 | About'} name={this.state.name}/>}/>
            <Route path='/contact' render={() => <Contact title={'Foxes65 | Contact'} />}/>
            <Route path='/F1' render={() => <F1 f1APIdata={this.f1APIdata} drivers={this.state.drivers}/>}/>
            <Route path='/shop' render={() => <Shop addToCart={this.addToCart}/>}/>
            <Route path='/cart' render={() => <Cart cart={this.state.cart} total={this.state.total} removeFromCart={this.removeFromCart}/>}/>
            <Route path='/checkout' render = {() => <Checkout total={this.state.total}/>}/>
          </Switch>
        </main>

      </div>
    )
  }
};