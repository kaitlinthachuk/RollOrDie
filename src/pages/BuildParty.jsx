import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import Page from './Page.jsx';
import AddPlayerForm from '../components/AddPlayerForm.jsx';

// styles
import '../styles/BuildParty.scss';

class BuildParty extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      showModal: false,
      saved: false,
    }
    this.addPlayer = this.addPlayer.bind(this);
    this.savePlayer = this.savePlayer.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.saveParty  = this.saveParty.bind(this);
  }
  render() {
    const { showModal, saved, players } = this.state;
    if (saved) {
      localStorage.setItem(
        'savedParties',
        JSON.stringify([
          { 
            name: this.refs['party-name'].value.trim(),
            players 
          }])
        );
      return <Redirect to={'/'} />
    }
    return (
      <Page
        id='create-party-page'
        title='New Party'
        trailing={<button onClick={this.saveParty}>Save</button>}
        leading={<Link to={'/parties'}>Back</Link>}>
        { showModal ? 
        <div className="modal-dialog">
           <AddPlayerForm 
            onPlayerAdd={this.savePlayer}
            cancelButton={true}
            onCancel={this.closeDialog}/>
        </div> :
        null }
        <div id='build-party-header'>
          <input ref='party-name' type="text" placeholder='The Fellowship...'/>
          <button onClick={this.addPlayer}>Add Player</button>
        </div>
        <div>
          { this.buildPlayerList() }
        </div>
    </Page>
    );
  }

  buildPlayerList() {
    const { players } = this.state;
    return players.map((player, index) => {
      return <div key={index}>{player.name}</div>;
    });
  }

  saveParty() {
    this.setState({
      saved: true,
    });
  }

  addPlayer() {
    this.setState({
      showModal: true,
    })
  }

  savePlayer(newPlayer) {
    const { players } = this.state;
    this.setState({
      players: [...players, newPlayer],
      showModal: false,
    });
  }

  closeDialog() {
    this.setState({
      showModal: false,
    });
  }
}

export default BuildParty;
