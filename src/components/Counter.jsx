import React, { Component } from 'react';
import '../styles/Counter.scss';

class Counter extends Component {
constructor(props) {
  super();
  this.deleteCounter = this.deleteCounter.bind(this);
}
deleteCounter(e){
  e.preventDefault();
  this.props.onClick(this.props.index);
}

  render() {
    const { name, roundExpire, turn_participant, deleteCounter} = this.props;
    return (
      <div className='round-counter'>
        <p className = 'counter-text'> {name}: 1 minute duration, <br/>
        expires Round {roundExpire} on {turn_participant.name}'s turn </p>
        <button className='round-counter-button' onClick = {deleteCounter}>x</button>
      </div>
    );
  }
}

export default Counter;
