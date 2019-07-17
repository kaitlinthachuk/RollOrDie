import React, { Component } from 'react';

class MonsterAttributes extends Component {
  render() {
    const { attributes, size, alignment, type, highlightText } = this.props;

    return (
      <div className = "monster-attributes">
      <p> {highlightText('Size')}: {size}</p>
      <p> {highlightText('Alignment')}: {alignment} </p>
      <p> {highlightText('Type')}: {type}</p>
      <p> {highlightText('Type')}: {attributes['armor-class'].type}</p>
      <p> {highlightText('Hit Dice')}: {attributes['hit-points']['hit-die']}</p>
      <p> {highlightText('Speed')}: {attributes.speed}</p>
      </div>
    );
  }
}

export default MonsterAttributes;
