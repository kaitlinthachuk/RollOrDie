import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Page from './Page.jsx';
import AddPlayerForm from '../components/AddPlayerForm.jsx';

import '../styles/PlayerSelection.scss'


class PlayerSelection extends Component {
  constructor() {
    super();
    this.state = {
      playerList: [], 
      monsterList: [],
    };
    this.handlePlayerAdd = this.handlePlayerAdd.bind(this);
    this.deleteOnClick = this.deleteOnClick.bind(this);
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
    const { playerList } = this.state;
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
        leading={<Link to={'/New'}>Back</Link>}
        trailing={<Link to={{pathname: '/Encounter', state : this.state} }>Next</Link>}>
        <AddPlayerForm onPlayerAdd = {this.handlePlayerAdd} />
        <div id ="added-players-container">
          {players}
        </div>
      </Page>
    );
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
