import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

// Pages
import Home from './pages/Home.jsx';
import Create from './pages/Create.jsx';
import PlayerSelection from './pages/PlayerSelection.jsx';
import EncounterManager from './pages/EncounterManager.jsx'
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
          <Route exact path="/encounters" component={Encounters} />
          <Route exact path="/encounters/new" component={Create} />
          <Route exact path="/encounters/edit/:uid" component={Create} />
          <Route path="/PlayerSelection" component={PlayerSelection} />
          <Route exact path="/Encounter" component={EncounterManager} />
          <Route exact path="/parties/edit/:uid" component={BuildParty} />
          <Route exact path="/parties/new/" component={BuildParty} />
          <Route exact path="/parties" component={Parties} />
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
