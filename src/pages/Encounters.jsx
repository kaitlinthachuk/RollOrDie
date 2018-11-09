import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import utils from '../utils.js';
import Page from './Page.jsx';

// styles
import '../styles/Encounters.scss';

class Encounters extends Component {
  constructor(props) {
    super(props);
    this.savedEncounters = utils.getEncountersFromStorage();
    this.state = {
      encounterClicked: false,
    }
  }

  render() {
    const { encounterSelected, selectedEncounter } = this.state;
    if (encounterSelected) {
      return <Redirect to={{pathname: '/PlayerSelection', state: selectedEncounter}} />
    }
    return (
      <Page
        id='encounters-page'
        title='Your Encounters'
        leading={<Link to='/'>Back</Link>}
        trailing={<Link to='/encounters/new'>New Encounter</Link>}
      >
        <ul>
          { Object.values(this.savedEncounters).map((encounter) => {
            return this.EncounterCard(encounter);
          })}  
        </ul>  
      </Page>
    );
  }

  EncounterCard(encounter) {
    const { name, selectedMonsters } = encounter;
    return (
      <li className='encounter-card' onClick={() => this.handleEncounterClick(encounter)}>
        <h2>{name}</h2>
        <div>{Object.values(selectedMonsters).reduce((acc, monster) => { return acc += monster.count + 'x ' + monster.name + ', ';}, '')}</div>
      </li>
    );
  }

  handleEncounterClick(selectedEncounter) {
    this.setState({
      encounterSelected: true,
      selectedEncounter: selectedEncounter,
    })
  }
}

export default Encounters;