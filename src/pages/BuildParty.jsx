import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import utils from '../utils.js';


import Page from './Page.jsx';

import AddPlayerForm from '../components/AddPlayerForm.jsx';
import ModalDialog from '../components/ModalDialog.jsx';

// styles
import '../styles/BuildParty.scss';

class BuildParty extends Component {
  constructor(props) {
    super(props);
    let passedParty = props.location ? (props.location.state ? props.location.state.selectedParty : { title: '', players: []}) : { title: '', players: []};
    
    this.state = {
      party    : passedParty,
      showModal: false,
      saved    : false,
    }

    this.addPlayer         = this.addPlayer.bind(this);
    this.savePlayer        = this.savePlayer.bind(this);
    this.saveParty         = this.saveParty.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }
  render() {
    const { showModal, saved, party } = this.state;
    if (saved) {
     return <Redirect to={'/parties'} />
    }
    return (
      <Page
        id='create-party-page'
        title='New Party'
        trailing={<div onClick={this.saveParty}>Save</div>}
        leading={<Link to={'/parties'}>Back</Link>}>
        <ModalDialog show={showModal} onEsc={this.addPlayer}>
          <AddPlayerForm 
            onPlayerAdd={this.savePlayer}
            cancelButton={true}
            onCancel={this.addPlayer}/>
        </ModalDialog>
        <div id='build-party-header'>
          <input id='title' type="text" value={party.title} onChange={this.handleTitleChange} placeholder='The Fellowship...'/>
          <button onClick={this.addPlayer}>Add Player</button>
        </div>
        <div>
          { this.buildPlayerList() }
        </div>
    </Page>
    );
  }

  buildPlayerList() {
    const { players } = this.state.party;
    return players.map((player, index) => {
      return <div key={index}>{player.name}</div>;
    });
  }

  saveParty() {
    const { party } = this.state;  
    utils.savePartyToStorage(party);
    this.setState({
      saved: true,
    });
  }

  handleTitleChange({target}) {
    const { party } = this.state;
    party.title = target.value;
    this.setState({
      party: party,
    })
  }

  addPlayer() {
    const { showModal } = this.state;
    this.setState({
      showModal: !showModal,
    })
  }

  savePlayer(newPlayer) {
    const { party } = this.state;
    party.players = [...party.players, newPlayer];
    this.setState({
      party: party,
      showModal: false,
    });
  }
}

export default BuildParty;
