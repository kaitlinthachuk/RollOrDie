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
    const {name, ac, unconscious} = this.props;

    return (
      <div className='player-tile' id = {name}>
        <p>{name} </p>
        <p><i className='ac-icon'></i> {ac}</p>
        <label className= 'unconscious-label'>
        <input type='checkbox' id = {name} onChange = {this.checkboxClicked} checked={unconscious ? 'checked' : ''}>
        </input> Unconscious </label>
      </div>
    );
  }
}

export default Player;
