import React, { Component } from 'react';
import '../styles/Player.scss';

class Player extends Component {
  render() {
    var playerName = this.props.name;
    var playerAc = this.props.ac;
    return (
      <div className='player-tile' id = {playerName}>
        <p>Player: {playerName} <label className= 'unconscious-label'> <input type='checkbox'></input>Unconscious </label> <br></br>
         AC: {playerAc}</p>
      </div>
    );
  }
}

export default Player;
