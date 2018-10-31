import React, { Component } from 'react';
import BottomNavbar from './components/BottomNavbar.jsx';
import Navbar from './components/Navbar.jsx';
import EncounterManager from './components/EncounterManager.jsx';

import './styles/App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar></Navbar>
        <EncounterManager></EncounterManager>
        <BottomNavbar></BottomNavbar>
      </div>
    );
  }
}

export default App;
