import React, { Component } from 'react';
import '../styles/Monster.scss';
import HP from './HP.jsx'

class SidebarMonster extends Component {
  getTraits(traits){
    let content = [];
    let i = 0;
    if(traits.hasOwnProperty('damage-immunities')){
      content.push(<p key = {i}>Damage Immunities: {traits['damage-immunities']} </p>);
    } else if (traits.hasOwnProperty('damage-resistances')){
      content.push(<p key = {i + 1}>Damage Resistances: {traits['damage-resistances']} </p>);
    } else if (traits.hasOwnProperty('damage-vulnerabilities')){
      content.push(<p key = {i + 2}>Damage Vulnerabilities: {traits['damage-vulnerabilities']} </p>);
    } else if (traits.hasOwnProperty('condition-immunities')){
      content.push(<p key = {i + 3}>Condition Immunities: {traits['condition-immunities']} </p>);
    } else if (traits.hasOwnProperty("saving-throws")){
      content.push(<p key = {i + 4}>Saving Throws: {traits['saving-throws']} </p>);
    }
    return(<div className = "sidebar-traits">{content}</div>)
  }

  getActions(actions){
    let content     = [],
        spanContent = [];

    if(actions.hasOwnProperty('legendary-actions')){
      actions['legendary-actions'].forEach(function(action,index){
        if(action.name === "General"){
          content.unshift(<p key = {index}>{action.description}</p>)
        } else {
          content.push(<p key = {index}>{action.name} : {action.description}</p>);
          Object.entries(action).forEach(function(entry, index) {
            if(entry[0] !== "name" && entry[0] !== "description") {
            spanContent.push(<span key = {index + 200}>{entry[0]} : {entry[1]} </span>);
          }
        });
            content.push(<p key = {index + 100}>{spanContent}</p>);
        }
      });
    } else if (actions.hasOwnProperty('passive')){
      actions['passive'].forEach(function(action, index){
      content.push(<p key = {index}>{action.name} {action.description}</p>);
      Object.entries(action).forEach(function(entry, index) {
        if(entry[0] !== "name" && entry[0] !== "description") {
        spanContent.push(<span key = {index + 10}>{entry[0]} : {entry[1]} </span>);
      }
    });
        content.push(<p key = {index + 200}>{spanContent}</p>);
      });
    }

    return (<div className = "sidebar-actions">{content}</div>);

  }
  render() {
    const { monster, updateHp } = this.props;

    return (
      <div className='monster-tile' id = {monster.name}>
      <h4>{monster.name}</h4>
      <HP count = {monster.count} hpList = {monster.hpList} updateHp = {updateHp} monsterName = {monster.name}/>
      <p><i className = "ac-icon"></i> {monster.details.attributes['armor-class'].score} {monster.details.attributes['armor-class'].type? 'Type : ' + monster.details.attributes['armor-class'].type: "" } </p>
      <p> Modifiers: Cha: {monster.details.abilities.cha.modifier} Con: {monster.details.abilities.con.modifier} Dex: {monster.details.abilities.dex.modifier}
       Int: {monster.details.abilities.int.modifier} Str: {monster.details.abilities.str.modifier} Wis: {monster.details.abilities.wis.modifier}</p>
      {this.getTraits(monster.details.traits)}
      {this.getActions(monster.details.actions)}
      </div>
    );
  }
}

export default SidebarMonster;
