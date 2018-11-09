import React, { Component } from 'react';

class MonsterAttributes extends Component {
  render() {
    var p = this.props;
    var attributes = p.attributes;
    return (
      <div>
      <h4>Monster Attributes</h4>
      <p> {p.highlightText('Size')}: {this.props.size}  {p.highlightText('Alignment')}: {this.props.alignment} {p.highlightText('Type')}: {this.props.type}</p>
      <p> {p.highlightText('Armor Class')}: {attributes['armor-class'].score} {p.highlightText('Type')}: {attributes['armor-class'].type}</p>
      <p> {p.highlightText('Hit Dice')}: {attributes['hit-points']['hit-die']} {p.highlightText('Speed')}: {attributes.speed}</p>
      </div>
    );
  }
}

export default MonsterAttributes;
