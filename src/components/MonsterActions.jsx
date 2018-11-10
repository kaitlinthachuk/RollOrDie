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
    actions.forEach(function(action){
      if(action.name === "Multiattack") {
        content.unshift(<p>{highlightText("Multiattack")} : {action.description}</p>)
      }
      else if (action.name && !action["damage-die"]) {
          content.push(<p>{highlightText(capitalize(action.name))} : {action.description}</p>);
        }
      else {
        content.push(<p>{highlightText(capitalize(action.name))}: {action.description}</p>);
        var spanContent = [];
        Object.entries(action).forEach(function(entry) {
          if(entry[0] !== "name" && entry[0] !== "description") {
          spanContent.push(<span>{highlightText(capitalize(entry[0]))} : {entry[1]} </span>);
        }
      });
          content.push(<p>{spanContent}</p>);
      }
    });

    return (<div className = "actions">{content}</div>);
  }
  processLegendaryActions(actions){
    var content = [];
    var highlightText = this.highlightText;
    var capitalize = this.capitalize;

    actions.forEach(function(action){
      if(action.name === "General"){
        content.unshift(<p>{action.description}</p>)
      } else {
        content.push(<p>{highlightText(capitalize(action.name))}: {action.description}</p>);
        var spanContent = [];
        Object.entries(action).forEach(function(entry) {
          if(entry[0] !== "name" && entry[0] !== "description") {
          spanContent.push(<span>{highlightText(capitalize(entry[0]))} : {entry[1]} </span>);
        }
      });
          content.push(<p>{spanContent}</p>);
      }

    });
    return (<p><h4>Legendary Actions</h4>{content}</p>);
  }
  processPassiveActions(actions){
    var content = [];
    var highlightText = this.highlightText;
    var capitalize = this.capitalize;
      actions.forEach(function(action){
    content.push(<p>{highlightText(capitalize(action.name))}: {action.description}</p>);
    var spanContent = [];
    Object.entries(action).forEach(function(entry) {
      if(entry[0] !== "name" && entry[0] !== "description") {
      spanContent.push(<span>{highlightText(capitalize(entry[0]))} : {entry[1]} </span>);
    }
  });
      content.push(<p>{spanContent}</p>);
    });
    return (<p><h4>Extras</h4>{content}</p>);
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
      <div>
      <h4>Actions</h4>
      {this.extractActions(actions)}
      </div>
    );
  }
}

export default MonsterActions;
