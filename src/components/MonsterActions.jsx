import React, { Component } from 'react';

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
    var content = [];
    var highlightText = this.highlightText;
    var capitalize = this.capitalize;

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
          content.push(<p key = {index + 100}>{spanContent}</p>);
      }

    });

    return (<div key = "1000" className = "actions">{content}</div>);
  }
  processLegendaryActions(actions){
    var content = [];
    var highlightText = this.highlightText;
    var capitalize = this.capitalize;

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
          content.push(<p key = {index + 100}>{spanContent}</p>);
      }

    });
    return (<div key = "1001" className = "legendary-actions"><h4>Legendary Actions</h4>{content}</div>);
  }
  processPassiveActions(actions){
    var content = [];
    var highlightText = this.highlightText;
    var capitalize = this.capitalize;
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
    return (<div key = "1002" className = "extras"><h4>Extras</h4>{content}</div>);
  }
  extractActions(actions){
    var content = [];
    var processActions = this.processActions;
    var processLegendaryActions = this.processLegendaryActions;
    var processPassiveActions = this.processPassiveActions;
    Object.entries(actions).forEach(function(action) {
      if(action[0] === "actions"){
        content.push(processActions(action[1]));
      }
      else if(action[0] === "legendary-actions"){
        content.push(processLegendaryActions(action[1]));
      }
      else if (action[0] === "passive"){
      content.push(processPassiveActions(action[1]));
      }
    });
      return content;
  }
  render() {
    var p = this.props;
    var actions = p.actions;
    this.highlightText = p.highlightText;
    this.capitalize = p.capitalize;

    return (
      <div className = "actions-container">
      <h4>Actions</h4>
      {this.extractActions(actions)}
      </div>
    );
  }
}

export default MonsterActions;
