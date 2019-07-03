import React, { Component } from 'react';
import '../styles/Carousel.scss';

class Carousel extends Component {
  render() {
    var children = this.props.children;

    return (
      <div className = "carousel">
        <div className = 'round-tracker'><h2 className = "round-title">Current Round: {this.props.roundCount}</h2>
          <button className = 'round-button' onClick = {this.props.nextTurn}>Next</button>
        </div>
        {children[this.props.currentParticipantIndex]}
        <div><button className='button' onClick = {this.props.nextTurn}>Next</button></div>
      </div>
    )
  }
}

export default Carousel;
