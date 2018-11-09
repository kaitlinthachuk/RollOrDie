import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Page from './Page.jsx';

class Encounters extends Component {
  constructor(props) {
    super(props);
    let savedEncounters      = localStorage.getItem('savedEncounters');
    this.savedEncounters = savedEncounters ? JSON.parse(savedEncounters) : [];
  }

  render() {
    return (
      <Page
        id='encounters-page'
        title='Your Encounters'
        leading={<Link to='/'>Back</Link>}
        trailing={<Link to='/encounters/new'>New Encounter</Link>}
      >
        <ul>
          { this.savedEncounters.map((encounter) => {
            return <li>{encounter.name}</li>
          })}  
        </ul>  
      </Page>
    );
  }
}

export default Encounters;