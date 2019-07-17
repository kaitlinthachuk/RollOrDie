import React, { Component } from 'react';
import '../styles/Carousel.scss';

class Carousel extends Component {
  render() {
    const { roundCount, children, nextTurn, currentParticipantIndex } = this.props;

    return (
      <div className = "carousel">
        <h2 className = "round-title">Current Round: {roundCount}</h2>
        <button className = 'round-button' onClick = {nextTurn}>Next</button>
        {children[currentParticipantIndex]}
        <button className='round-button-bottom' onClick = {nextTurn}>Next</button>
      </div>
    )
  }
}

export default Carousel;
