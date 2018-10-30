import React, { Component } from 'react';
import BottomNavbar from './components/BottomNavbar.jsx';
import Navbar from './components/Navbar.jsx';

import './styles/App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar></Navbar>
        <BottomNavbar></BottomNavbar>
      </div>
    );
  }
}

export default App;
