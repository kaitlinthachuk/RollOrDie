import React, { Component } from 'react';
import '../styles/Player.scss';

class Player extends Component {
  render() {
    var playerName = this.props.name;
    var playerAc = this.props.ac;
    return (
      <div className='player-container'>
        <p>Player: {playerName} <br></br>
         AC: {playerAc}</p>
      </div>
    );
  }
}

export default Player;
