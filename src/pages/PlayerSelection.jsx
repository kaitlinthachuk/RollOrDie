import React, { Component } from 'react';
import { Link } from "react-router-dom";
import utils from '../utils.js';
import Page from './Page.jsx';
import AddPlayerForm from '../components/AddPlayerForm.jsx';
import ModalDialog from '../components/ModalDialog.jsx';

import '../styles/PlayerSelection.scss'


class PlayerSelection extends Component {
  constructor() {
    super();
    this.state = {
      playerList: [], 
      monsterList: [],
      pickParty: false,
    };
    this.handlePlayerAdd = this.handlePlayerAdd.bind(this);
    this.deleteOnClick = this.deleteOnClick.bind(this);
    this.handleAddPartyClick = this.handleAddPartyClick.bind(this);
  }
  componentDidMount() {
    var recievedMonsters = this.props.location.state.monsterList;
    console.log(recievedMonsters);

    this.setState({
      monsterList : recievedMonsters
    })
  }
  deleteOnClick(e){
    e.preventDefault();
    var playerContainer = e.target.parentElement.parentElement;
    var name = playerContainer.id;
    var newList = this.state.playerList.filter(player => {
      return player.name !== name;
    })

    this.setState({
      playerList: newList
    })
  }

  handlePlayerAdd(newPlayer){
    this.setState({
      playerList: [...this.state.playerList, newPlayer]
    })
  }

  render() {
    const { playerList, pickParty } = this.state;
    let players = playerList.map((player, index) => {
      return (<PlayerComponent 
        playerName={player.name} 
        ac={player.ac} 
        key= {index} 
        initiative={player.initiative}
        deleteOnClick = {this.deleteOnClick}
      />);
    })

    return (
      <Page
        id='player-selection-page'
        leading={<Link to={'/encounters/new'}>Back</Link>}
        trailing={<Link to={{pathname: '/Encounter', state : this.state} }>Next</Link>}>
        <ModalDialog show={pickParty} onEsc={this.handleAddPartyClick}>
          <ul>
          {utils.getPartiesFromStorage(true).map((party) => {
            return this.PartyPicker(party);
          })}
          </ul>
        </ModalDialog>
        <AddPlayerForm onPlayerAdd={this.handlePlayerAdd} />
        <button onClick={this.handleAddPartyClick}>Add Party</button>
        <div id ="added-players-container">
          {players}
        </div>
      </Page>
    );
  }

  handleAddPartyClick() {
    const { pickParty } = this.state;
    this.setState({
      pickParty: !pickParty,
    });
  }

  addParty(party) {
    const { pickParty, playerList } = this.state;
    this.setState({
      pickParty: !pickParty,
      playerList: [...party.players, ...playerList],
    })
  }

  PartyPicker(party) {
    return (
      <li onClick={() => this.addParty(party)}>{party.title}</li>
    )
  }
}

const PlayerComponent = props => (<div className = "player-card" id = {props.playerName}>
  <p> Player's Name: {props.playerName}
  <button className='button' onClick = {props.deleteOnClick}>Delete</button></p>
  <p> Player's AC: {props.ac}</p>
  <p>Player's Initiative: {props.initiative}</p>
</div>
);

export default PlayerSelection;
