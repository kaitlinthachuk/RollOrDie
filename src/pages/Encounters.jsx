import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { storage, constants } from '../utils.js';

import Page from './Page.jsx';

// styles
import '../styles/Encounters.scss';
import CardListView from '../components/CardListView.jsx';

class Encounters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      encounter: null,
      savedEncounters: storage.getEncountersFromStorage(),
    }

    this.handleEncounterClick  = this.handleEncounterClick.bind(this);
    this.handleEncounterDelete = this.handleEncounterDelete.bind(this);
  }

  render() {
    const { encounter, savedEncounters } = this.state;

    if (encounter) {
      switch(encounter.stage) {
        case constants.EncounterStage.CREATED:
          return <Redirect to={{pathname: '/encounters/new', state: { encounter: encounter } }} />;
        case constants.EncounterStage.MONSTERS_SELECTED:
          return <Redirect to={{pathname: '/PlayerSelection', state: { encounter: encounter } }} />
        default:
          //TODO
      }
    }
    return (
      <Page
        id='encounters-page'
        title='Your Encounters'
        leading={<Link to='/'>Back</Link>}
        trailing={<Link to='/encounters/new'>New Encounter</Link>}
      >
        <CardListView
          listItems={Object.values(savedEncounters)}
          className={'encounter-card'}
          onCardClick={this.handleEncounterClick}
          onCardDelete={this.handleEncounterDelete}
          render={(encounter) => {
            const { title, selectedMonsters } = encounter;
            return (
              <div>
                <h2>{title}</h2>
                <div>{
                  Object.values(selectedMonsters)
                    .reduce((acc, monster) => { return acc += monster.count + 'x ' + monster.name + ', ';}, '')}
                </div>
              </div>
            );
          }}
          />
      </Page>
    );
  }

  handleEncounterClick(encounter) {
    this.setState({
      encounter: encounter,
    })
  }

  handleEncounterDelete(encounter) {
    let success = storage.removeEncounterFromStorage(encounter);
    if (success) {
      this.setState({
        savedEncounters: storage.getEncountersFromStorage(),
      })
    }
  }
}

export default Encounters;