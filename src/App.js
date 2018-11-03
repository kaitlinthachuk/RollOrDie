import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

// Pages
import Create from './pages/Create.jsx';
import PlayerSelection from './pages/PlayerSelection.jsx';
import Encounter from './pages/Encounter.jsx'


import './styles/App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={null} />
          <Route path="/New" component={Create} />
          <Route path="/PlayerSelection" component={PlayerSelection} />
          <Route path="/Encounter" component={Encounter} />
        </div>
      </Router>
    );
  }
}

export default App;
