import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

// Pages
import Create from './pages/Create.jsx'


import './styles/App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={null} />
          <Route path="/New" component={Create} />
        </div>
      </Router>
    );
  }
}

export default App;
