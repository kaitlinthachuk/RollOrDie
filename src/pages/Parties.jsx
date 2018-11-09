import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import utils from '../utils.js';

import Page from './Page.jsx';

// styles
import '../styles/Parties.scss';

class Parties extends Component {
  constructor(props) {
    super(props);
    this.savedParties = utils.getPartiesFromStorage();
    this.handlePartyClick = this.handlePartyClick.bind(this);

    this.state = {
      selectedParty: null,
    }
  }

  render() {
    const { selectedParty } = this.state;
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
        <ul>
          { 
            Object.values(this.savedParties).map((party) => {
              return this.PartyCard(party)
            })
          }
        </ul>
      </Page>
    );
  }

  PartyCard(party) {
    const { title, players } = party;
    return (
      <li className='party-card' onClick={() => this.handlePartyClick(party)}>
        <h2>{title}</h2>
        <div>{players.reduce((acc, player) => { return acc += player.name + ', '}, '')}</div>
      </li>
    )
  }

  handlePartyClick(party) {
    this.setState({
      selectedParty: party,
    })
  }
}

export default Parties;