import React, { Component } from 'react';
import '../styles/Carousel.scss';

class Carousel extends Component {
  render() {
    var children = this.props.children;

    return (
      <div className = "carousel">
        <h2 className = "round-title">Current Round: {this.props.roundCount}</h2>
        <button className = 'round-button' onClick = {this.props.nextTurn}>Next</button>
        {children[this.props.currentParticipantIndex]}
        <button className='round-button-bottom' onClick = {this.props.nextTurn}>Next</button>
      </div>
    )
  }
}

export default Carousel;
