import React, { Component } from 'react';
import '../styles/MonsterActions.scss';

class MonsterActions extends Component {
  constructor(props){
    super(props);
    this.extractActions = this.extractActions.bind(this);
    this.processActions = this.processActions.bind(this);
    this.processLegendaryActions = this.processLegendaryActions.bind(this);
    this.processPassiveActions = this.processPassiveActions.bind(this);
    this.highlightText = null;
    this.capitalize = null;
  }
  processActions(actions){
    let content       = [],
        highlightText = this.highlightText,
        capitalize    = this.capitalize;

    actions.forEach(function(action, index){
      if(action.name === "Multiattack") {
        content.unshift(<p key = {index}>{highlightText("Multiattack")} : {action.description}</p>)
      }
      else if (action.name && !action["damage-die"]) {
          content.push(<p key = {index}>{highlightText(capitalize(action.name))} : {action.description}</p>);
        }
      else {
        content.push(<p key = {index}>{highlightText(capitalize(action.name))}: {action.description}</p>);
        var spanContent = [];
        Object.entries(action).forEach(function(entry, index) {
          if(entry[0] !== "name" && entry[0] !== "description") {
          spanContent.push(<span key = {index + 200}>{highlightText(capitalize(entry[0]))} : {entry[1]} </span>);
        }
      });
          content.push(spanContent);
      }

    });

    return (<div key = "1000" className = "actions">{content}</div>);
  }
  processLegendaryActions(actions){
    let content       = [],
        highlightText = this.highlightText,
        capitalize = this.capitalize;

    actions.forEach(function(action, index){
      if(action.name === "General"){
        content.unshift(<p key = {index}>{action.description}</p>)
      } else {
        content.push(<p key = {index}>{highlightText(capitalize(action.name))}: {action.description}</p>);
        var spanContent = [];
        Object.entries(action).forEach(function(entry, index) {
          if(entry[0] !== "name" && entry[0] !== "description") {
          spanContent.push(<span key = {index + 200}>{highlightText(capitalize(entry[0]))} : {entry[1]} </span>);
        }
      });
          content.push(spanContent);
      }

    });
    return (<div key = "1001" className = "legendary-actions">{content}</div>);
  }
  processPassiveActions(actions){
    let content       = [],
        highlightText = this.highlightText,
        capitalize = this.capitalize;

    actions.forEach(function(action, index){
    content.push(<p key = {index}>{highlightText(capitalize(action.name))}: {action.description}</p>);
    var spanContent = [];
    Object.entries(action).forEach(function(entry, index) {
      if(entry[0] !== "name" && entry[0] !== "description") {
      spanContent.push(<span key = {index}>{highlightText(capitalize(entry[0]))} : {entry[1]} </span>);
    }
  });
      content.push(<p key = {index + 100}>{spanContent}</p>);
    });
    return (<div key = "1002" className = "extras">{content}</div>);
  }
  extractActions(actions){
    let content                 = [],
        processActions          = this.processActions,
        processLegendaryActions = this.processLegendaryActions,
        processPassiveActions   = this.processPassiveActions;

    Object.entries(actions).forEach(function(action) {
      if(action[0] === "actions"){
        content.push(processActions(action[1]));
      }
      else if(action[0] === "legendary-actions"){
        content.push(<h4 className= "legendary-title">Legendary Actions</h4>)
        content.push(processLegendaryActions(action[1]));
      }
      else if (action[0] === "passive"){
      content.push(<h4 className= "extras-title">Extras</h4>)
      content.push(processPassiveActions(action[1]));
      }
    });
      return content;
  }
  render() {
    const { actions, highlightText, capitalize } = this.props;
    this.highlightText = highlightText;
    this.capitalize = capitalize;

    return (
      <div className = "actions-container">
      <h4 className= 'actions-title'>Actions</h4>
      {this.extractActions(actions)}
      </div>
    );
  }
}

export default MonsterActions;
