import React, { Component } from 'react';
import '../styles/Carousel.scss';

class Carousel extends Component {
  constructor (props) {
    super(props);
    this.nextTurn = this.nextTurn.bind(this);
    this.state = {
      currentParticipantIndex: 0,
      roundCount: 1
    };
  }
  nextTurn() {
    var lastIndex = this.props.children.length - 1;
    var currentIndex = this.state.currentParticipantIndex;
    var currentRound = this.state.roundCount;
    const shouldResetIndex = currentIndex === lastIndex;
    const index =  shouldResetIndex ? 0 : currentIndex + 1;
    const round = shouldResetIndex ? currentRound + 1 : currentRound;
    console.log(lastIndex, index, round, shouldResetIndex)
    this.setState({
      currentParticipantIndex: index,
      roundCount: round
    });
  }
  render() {
    var children = this.props.children;
    console.log(children);

    return (
      <div className = "carousel">
        <div className = 'round-tracker'><h3>Curent Round: {this.state.roundCount}</h3></div>
        {children[this.state.currentParticipantIndex]}
        <div><button className='button' onClick = {this.nextTurn}>Next</button></div>
      </div>
    )
  }
}

export default Carousel;
