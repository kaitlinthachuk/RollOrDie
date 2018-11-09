import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

// Pages
import Home from './pages/Home.jsx';
import Create from './pages/Create.jsx';
import PlayerSelection from './pages/PlayerSelection.jsx';
import Encounter from './pages/Encounter.jsx'
import BuildParty from './pages/BuildParty.jsx';
import Parties from './pages/Parties.jsx';
import Encounters from './pages/Encounters.jsx';

// Styles
import './styles/App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route exact path="/encounters" component={Encounters} />
          <Route path="/encounters/new" component={Create} />
          <Route path="/PlayerSelection" component={PlayerSelection} />
          <Route exact path="/Encounter" component={Encounter} />
          <Route path="/parties/new" component={BuildParty} />
          <Route exact path="/parties" component={Parties} />
        </div>
      </Router>
    );
  }
}

export default App;
