import React, { Component } from 'react';
import '../styles/Monster.scss';
import MonsterActions from './MonsterActions.jsx';
import MonsterTraits from './MonsterTraits.jsx';
import MonsterAbilities from './MonsterAbilities.jsx';
import MonsterAttributes from './MonsterAttributes';
import HP from './HP.jsx'

class Monster extends Component {
  constructor(props){
    super(props);
    this.highlightText = this.highlightText.bind(this);
    this.capitalize = this.capitalize.bind(this);
  }
  highlightText(text){
    return <span className = "important-text"> {text} </span>
  }
  capitalize(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  render() {
    var monster = this.props.monster;
    return (
      <div className='monster-tile' id = {monster.name}>
      <h2>{monster.name}</h2>
      <h4>Armor Class:{monster.attributes['armor-class'].score}</h4>
      <HP count = {monster.count} hpList = {monster.hpList} updateHp = {this.props.updateHp} monsterName = {monster.name}/>
      <MonsterAttributes attributes = {monster.attributes} size = {monster.size}
        alignment = {monster.alignment} type = {monster.type} highlightText = {this.highlightText}/>
      <MonsterAbilities abilities = {monster.abilities} highlightText = {this.highlightText}/>
      <MonsterTraits traits = {monster.traits} highlightText = {this.highlightText} capitalize = {this.capitalize}/>
      <MonsterActions  actions = {monster.actions} highlightText = {this.highlightText} capitalize = {this.capitalize}/>
      </div>
    );
  }
}

export default Monster;
/*
things that are important for monsters:
name, size, type, AC, HP, hit dice, speed, stats, save proficiencies and bonus,
skill proficiencies, damage resistances and immunities, senses - darkvision, passive perception,
languages, special abiliities, actions, legendary actions


MONSTER.jsx needs to handle:
Legendary actions, passive properties
*/
