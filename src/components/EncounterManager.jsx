import React, { Component } from 'react';
import Player from './Player.jsx';
import Monster from './Monsters.jsx';
import '../styles/EncounterManager.scss';

class EncounterManager extends Component {
  render() {
    return (
      <div className='encounter-container'>
        <Player name = "Player 1" ac = "18"></Player>
      </div>
    );
  }
}

export default EncounterManager;
