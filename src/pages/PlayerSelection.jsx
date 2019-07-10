import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { storage } from '../utils.js';
import Page from './Page.jsx';
import AddPlayerForm from '../components/AddPlayerForm.jsx';
import ModalDialog from '../components/ModalDialog.jsx';

import '../styles/PlayerSelection.scss'


class PlayerSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerList: [],
      monsterList: [],
      pickParty: false,
    };



    if (props.location && props.location.state && props.location.state.encounter) {
      this.state.encounter = props.location.state.encounter;
    } else {
      throw new Error('No encounter passed to /PlayerSelection!');
    }

    this.handlePlayerAdd = this.handlePlayerAdd.bind(this);
    this.deleteOnClick = this.deleteOnClick.bind(this);
    this.handleAddPartyClick = this.handleAddPartyClick.bind(this);
  }

  componentDidMount() {
    var recievedMonsters= this.props.location.state.encounter.selectedMonsters;
    this.setState({
      monsterList : recievedMonsters
    })
  }

  deleteOnClick(e){
    e.preventDefault();
    var playerContainer = e.target.parentElement;
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
    const { playerList, pickParty, encounter } = this.state;
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
        leading={<Link to={{ pathname:'/encounters/edit/' + this.props.location.state.encounter.uid }}>Back</Link>}
        trailing={<Link to={{pathname: '/Encounter', state : this.state} }>Next</Link>}>
        <ModalDialog show={pickParty} onEsc={this.handleAddPartyClick}>
          <ul className='party-picker'>
          {storage.getPartiesFromStorage(true).map((party) => {
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
      <li onClick={() => this.addParty(party)}><h3>{party.title}</h3></li>
    )
  }
}

const PlayerComponent = props => (<li className = "player-card" id = {props.playerName}>
<div className='player-delete' onClick = {(event) => props.deleteOnClick(event)}>X</div>
  <ul> {props.playerName}</ul>
  <ul> <i className='ac-icon'></i> {props.ac}    <i className='init-icon'></i> {props.initiative}</ul>
</li>
);

export default PlayerSelection;
