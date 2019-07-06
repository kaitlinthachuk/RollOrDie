import React, { Component } from 'react';
import '../styles/Hp.scss';

class HP extends Component {
  constructor (props) {
    super(props);
    this.healMonster = this.healMonster.bind(this);
    this.damageMonster = this.damageMonster.bind(this);
  }
  healMonster(e){
    e.preventDefault();
    var parent = e.target.parentElement;
    var newHp = parseInt(parent.dataset.currenthp) + parseInt(parent.children[0].value);
    parent.children[0].value = "";
    this.props.updateHp(newHp, parent.dataset.monsterindex, parent.id);
  }
  damageMonster(e){
    e.preventDefault();
    debugger;
    var parent = e.target.parentElement;
    var calculateHp = parseInt(parent.dataset.currenthp) - parseInt(parent.children[0].value);
    var newHp = calculateHp < 0 ? 0 : calculateHp;
    parent.children[0].value = "";
    this.props.updateHp(newHp, parent.dataset.monsterindex, parent.id);
  }
  render() {
    var content = [];

    for (var i = 0; i < this.props.count; i ++){
      content.push(<HPComponent name = {this.props.monsterName} hp = {this.props.hpList[i]}
        index = {i} heal = {this.healMonster} damage = {this.damageMonster} key = {i} />);
    }
    return (
      <div className = "hp-container">{content}</div>
    );
  }
}

const HPComponent = props => (
  <div className = "hp-element" id = {props.name} data-monsterindex = {props.index} data-currenthp = {props.hp}>
  Monster : {props.index + 1}  HP: {props.hp}
    <input className = "hp-input" type = "number"/>
    <button className='hp-button' onClick = {props.heal}>+</button>
    <button className='hp-button' onClick = {props.damage}>-</button>
</div>

);

export default HP;
