import React, { Component } from 'react';
import Counter from './Counter';

class RoundCounterManager extends Component {
//need functionality for adding and deleting Counter
// should disappear when time is up
constructor(props) {
  super();

  this.removeCounter = this.removeCounter.bind(this);
  this.addCounter = this.addCounter.bind(this);

  this.state = {
    counterList: []
  };
}

shouldComponentUpdate(){
  let counters = this.state.counterList;
  let tmp = counters.filter(function(element) {
    return !(this.props.roundCount === element.props.roundExpire &&
      this.props.currentParticipantIndex === element.props.turnExpire)
  }, this);

  if(tmp.length !== counters.length){
    this.setState({
      counterList: tmp
    });
  }
  return true;
}
removeCounter(index){
 let newList = this.state.counterList.filter(function(element) {
   return !(index === element.props.index)}, this);

  this.setState({
    counterList: newList
  })
}

addCounter(e){
  e.preventDefault();
  let effect_name = e.target.previousElementSibling.value;
  e.target.previousElementSibling.value = "";
  const { roundCount, currentParticipantIndex, rankedList } = this.props;

  let expires          = roundCount + 10,
      turn_participant = rankedList[currentParticipantIndex];

  let counter = <Counter name = {effect_name} roundSet = {roundCount}
                  roundExpire = {expires}
                  turnExpire = {currentParticipantIndex}
                  onClick = {this.removeCounter}
                  index = {Math.floor((Math.random() * 100) + 1)}
                  turn_participant = {turn_participant}/>
  this.setState({
    counterList: [...this.state.counterList, counter]
  })

}

  render() {
    return (
      <div className = 'counter-form'>
        <div className= "counters">
        <input className = "counter-input" type="text" name="effect" placeholder="Effect Name"
          autoComplete="off"/>
        <button className='counter-add-button' onClick = {this.addCounter}>Add</button>
        </div>
        {this.state.counterList}
      </div>
    );
  }
}

export default RoundCounterManager;
