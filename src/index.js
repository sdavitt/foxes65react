import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { firebaseConfig } from './config';
import firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuthProvider} from '@react-firebase/auth';

const stripePromise = loadStripe('pk_test_51JIDZiCXwiQzHBRpAVDdnY3jaleulH28kKQrCcSF7FPh99yLLp7q8iXKWyrvUXrnPAteYhizm7TzyfB5Rw5cll5G002rXatnh2')

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
        <Elements stripe={stripePromise} >
          <App />
        </Elements>
    </FirebaseAuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
