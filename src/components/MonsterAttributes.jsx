import React, { Component } from 'react';

class MonsterAttributes extends Component {
  render() {
    var p = this.props;
    var attributes = p.attributes;
    return (
      <div className = "monster-attributes">
      <p> {p.highlightText('Size')}: {this.props.size}</p>
      <p> {p.highlightText('Alignment')}: {this.props.alignment} </p>
      <p> {p.highlightText('Type')}: {this.props.type}</p>
      <p> {p.highlightText('Type')}: {attributes['armor-class'].type}</p>
      <p> {p.highlightText('Hit Dice')}: {attributes['hit-points']['hit-die']}</p>
      <p> {p.highlightText('Speed')}: {attributes.speed}</p>
      </div>
    );
  }
}

export default MonsterAttributes;
