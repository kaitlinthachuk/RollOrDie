import React, { Component } from 'react';

class Counter extends Component {
//need functionality for adding and deleting Counter
// should disappear when time is up
constructor(props) {
  super();
  this.deleteCounter = this.deleteCounter.bind(this);
}
deleteCounter(e){
  e.preventDefault();
  this.props.onClick(this.props.index);

}

  render() {
    return (
      <div className='round-counter'>
        <p> {this.props.name}: 1 minute duration, <br/>
        expires Round {this.props.roundExpire} on {this.props.turn_participant.name}'s turn </p>
        <button className='button' onClick = {this.deleteCounter}>x</button>
      </div>
    );
  }
}

export default Counter;
