import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { storage } from '../utils.js';

import Page from './Page.jsx';
import CardListView from '../components/CardListView.jsx';


// styles
import '../styles/Parties.scss';

class Parties extends Component {
  constructor(props) {
    super(props);
    this.handlePartyClick  = this.handlePartyClick.bind(this);
    this.handleRemoveParty = this.handleRemoveParty.bind(this);

    this.state = {
      selectedParty: null,
      savedParties: storage.getPartiesFromStorage(),
    }
  }

  render() {
    const { selectedParty, savedParties } = this.state;
    if (selectedParty) {
      return <Redirect to={{pathname: '/parties/new', state: this.state}} />
    }

    return (
      <Page 
        id='parties-page'
        title='Your Parties'
        leading={<Link to={'/'}>Back</Link>}
        trailing={<Link to={'/parties/new'}>Add Party</Link>}
        >
        <CardListView
          listItems    = {Object.values(savedParties)}
          className    = 'party-card'
          onCardClick  = {this.handlePartyClick}
          onCardDelete = {this.handleRemoveParty}
          render       = {(party) => {
            return (
                <div>
                  <h2>{party.title}</h2>
                  <div>{party.players.reduce((acc, player) => { return acc += player.name + ', '}, '')}</div>
                </div>
              );
            }}
          />
      </Page>
    );
  }

  handlePartyClick(party) {
    this.setState({
      selectedParty: party,
    })
  }

  handleRemoveParty(party) {
    let success = storage.removePartyFromStorage(party);
    if (success) {
      this.setState({
        savedParties: storage.getPartiesFromStorage(),
      })
    }
  }
}

export default Parties;