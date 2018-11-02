import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Page from './Page.jsx';
import '../styles/PlayerSelection.scss'

class PlayerSelection extends Component {
  constructor() {
    super();
    this.state = {playerList: []};
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.deleteOnClick = this.deleteOnClick.bind(this);
  }
  deleteOnClick(e){
    e.preventDefault();
    console.log(this.state.playerList)
    var playerContainer = e.target.parentElement.parentElement;
    var name = playerContainer.id;
    var newList = this.state.playerList.filter(player => {
      return player.name != name;
    })

    this.setState({
      playerList: newList
    })

    console.log(this.state)
  }
  onFormSubmit(e){
    e.preventDefault();
    var playerName = e.target.name.value;
    var ac = e.target.ac.value;
    var init = e.target.initiative.value;
    var newPlayer = {}

    if(playerName.length > 0){
      e.target.name.value = "";
      newPlayer.name = playerName;
    }

    if (ac >= 10 && ac < 25) {
      e.target.ac.value = "";
      newPlayer.ac = ac;
    }

    if (init > 0) {
      e.target.initiative.value = "";
      newPlayer.initiative = init;
    }

    this.setState({
    playerList: [...this.state.playerList, newPlayer]
  })
}
  render() {
    const players = [];

    for (var i in this.state.playerList) {
      var player = this.state.playerList[i];
      players.push(<PlayerComponent playerName={player.name} ac={player.ac} key= {i} initiative={player.initiative}
      deleteOnClick = {this.deleteOnClick}/>);
    };
    return (
      <Page
        id='player-selection-page'
        leading={<Link to={'/New'}>Back</Link>}
        trailing={<Link to={'/' }>Next</Link>}>
      <PlayerForm onFormSubmit ={this.onFormSubmit}>
        {players}
      </PlayerForm>
    </Page>
    );
  }
}

const PlayerForm = props => (
  <div>
  <form id = "player-form" onSubmit={props.onFormSubmit}>
    <div><input type="text" name = "name" placeholder = "Enter Player Name"/></div>
    <div><input type = "number" name = "ac" placeholder= "Enter Player's AC"></input></div>
    <div><input type = "number" name = "initiative" placeholder = "Enter Player's Initiative" ></input></div>
    <div><button>Add Player</button></div>
  </form>
  <div id ="added-players-container">
      {props.children}
    </div>
  </div>
);

const PlayerComponent = props => (<div className = "player-card" id = {props.playerName}>
  <p> Player's Name: {props.playerName}
  <button className='button' onClick = {props.deleteOnClick}>Delete</button></p>
  <p> Player's AC: {props.ac}</p>
  <p>Player's Initiative: {props.initiative}</p>
</div>
);

export default PlayerSelection;
