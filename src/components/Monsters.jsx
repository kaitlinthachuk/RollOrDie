import React, { Component } from 'react';
import '../styles/Monster.scss';

class Monster extends Component {
  render() {
    var monster = this.props.monster;
    var details = monster.details;
    var actions = details.actions;
    var special_abilities = details.special_abilities;
    return (
      <div className='monster-tile' id = {monster.name}>
      <h3>{monster.name}</h3>
      <h4>AC: {details.armor_class}</h4>
      <div className = "row"> <b>Size</b>: {details.size} <b>Type</b>: {details.type}</div>
      //special HP element
      <div className = "row"><b>Hit Dice</b>: {details.hit_dice} <b>Speed</b>: {details.speed}</div>
      <h4>Stats:</h4>
      <div className = "row">Str: {details.strength} Dex: {details.dexterity} Con: {details.constitution} Int: {details.intelligence} Wis: {details.wisdom} Cha: {details.charisma}</div>
      <h4>Abilities:</h4>
      <div className="row">
        { details.damage_vulnerabilities !== "" &&  <p> Vulnerabilities: {details.damage_vulnerabilities}</p> }
      { details.damage_resistances !== "" &&  <p> Resistances: {details.damage_resistances}</p> }
       { details.damage_immunities !== "" &&  <p> Damage Immunities: {details.damage_immunities}</p> }
       { details.condition_immunities !== "" &&  <p> Condition Immunities: {details.condition_immunities}</p> }
      <b>Senses</b>: {details.senses} <b>Languages</b>: {details.languages}</div>
      <h4>Special Abilities</h4>
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
*/
