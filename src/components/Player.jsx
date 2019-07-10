import React, { Component } from 'react';
import '../styles/Player.scss';

class Player extends Component {
  constructor(props) {
    super(props);
    this.checkboxClicked = this.checkboxClicked.bind(this);
  }
  checkboxClicked(e){
    this.props.updateConsciousness(e.target.id);
  }
  render() {
    var playerName = this.props.name;
    var playerAc = this.props.ac;
    var unconscious = this.props.unconscious;

    return (
      <div className='player-tile' id = {playerName}>
        <p>{playerName} <label className= 'unconscious-label'>
        <input type='checkbox' id = {playerName} onChange = {this.checkboxClicked} checked={unconscious ? 'checked' : ''}></input>Unconscious </label> <br></br>
         <i className='ac-icon'></i> {playerAc}</p>
      </div>
    );
  }
}

export default Player;
