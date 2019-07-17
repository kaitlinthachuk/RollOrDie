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
      enterPartyInits: false,
      party: [],
      initError: false,
    };



    if (props.location && props.location.state && props.location.state.encounter) {
      this.state.encounter = props.location.state.encounter;
    } else {
      throw new Error('No encounter passed to /PlayerSelection!');
    }

    this.handlePlayerAdd = this.handlePlayerAdd.bind(this);
    this.deleteOnClick = this.deleteOnClick.bind(this);
    this.handleAddPartyClick = this.handleAddPartyClick.bind(this);
    this.handleAddInitsClick = this.handleAddInitsClick.bind(this);
  }

  componentDidMount() {
    let recievedMonsters= this.props.location.state.encounter.selectedMonsters;
    this.setState({
      monsterList : recievedMonsters
    })
  }

  deleteOnClick(e){
    e.preventDefault();
    let name = e.target.parentElement.id;

    let newList = this.state.playerList.filter(player => {
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
    const { playerList, pickParty, enterPartyInits, party, initError } = this.state;

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
        <ModalDialog show={enterPartyInits} onEsc = {() =>{return;}}>
          <ul className='enter-inits'>
          <h3>Enter Player Initiatives</h3>
          {initError? <h4>All players must have an initiative</h4>: null}
              {party.map((player) => {
                return <li className = "party-player-add-initiative">
                        <p>{player.name}</p>
                        <p><i className='ac-icon'></i> {player.ac}</p>
                        <input  type = "number" name = "init" id = "party-player-init"/>
                      </li>
              })
              }
              <button onClick = {this.handleAddInitsClick}>Done</button>

          </ul>
        </ModalDialog>
        <AddPlayerForm onPlayerAdd={this.handlePlayerAdd} enterInit = {true} />
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

  handleAddInitsClick({target}){
    const { enterPartyInits, playerList, initError } = this.state;
    let partyInputs = [...target.parentElement.children],
        isError   = false,
        party       = [];

    partyInputs.shift();
    partyInputs.pop();

    if(initError){
      partyInputs.shift();
    }


    for(var i = 0; i <partyInputs.length; i++){
      let player = partyInputs[i];
      if(!player.children[2].value){
        isError = !isError;
        break;
      }

    party.push({
        name: player.children[0].innerText,
        ac: player.children[1].innerText,
        initiative: player.children[2].value,
      })

  };

    if (!isError){
    this.setState({
    enterPartyInits: !enterPartyInits,
    playerList: [ ...playerList, ...party],
  }) } else {
    this.setState({
      initError: isError,
    })
  }
}

  addParty(party) {
    const { pickParty, enterPartyInits } = this.state;
    this.setState({
      pickParty: !pickParty,
      enterPartyInits: !enterPartyInits,
      party: party.players,

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
