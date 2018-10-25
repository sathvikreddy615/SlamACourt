import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import ApplicationViews from "./components/ApplicationViews";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <ApplicationViews />
      </React.Fragment>  
    );
  }
}

export default App;
