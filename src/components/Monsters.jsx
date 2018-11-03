import React, { Component } from 'react';
import '../styles/Monster.scss';

class Monster extends Component {
  render() {
    var details = this.props.details;
    return (
      <div className='monster-tile' id = {details.name}>
      <p>{details.name}</p>
      </div>
    );
  }
}

export default Monster;
