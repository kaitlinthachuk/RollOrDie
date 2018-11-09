import React, { Component } from 'react';

class MonsterActions extends Component {
  extractActions(actions, highlightText, capitalize){
    var pContent = [];
    Object.entries(actions).forEach(function(action) {
      console.log(action);
    });
      return pContent;
  }
  render() {
    var p = this.props;
    var actions = p.actions;

    return (
      <div>
      <h3>Actions</h3>
      {this.extractActions(actions, p.highlightText, p.capitalize)}
      </div>
    );
  }
}

export default MonsterActions;
