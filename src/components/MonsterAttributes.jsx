import React, { Component } from 'react';

class MonsterAttributes extends Component {
  render() {
    var p = this.props;
    var attributes = p.attributes;
    return (
      <table className = "monster-attribute-table">
      <tr>
      <th rowspan = "2">Attributes</th>
      <td> {p.highlightText('Size')}: {this.props.size}</td>
      <td> {p.highlightText('Alignment')}: {this.props.alignment} </td>
      <td> {p.highlightText('Type')}: {this.props.type}</td>
      </tr>
      <tr>
      <td> {p.highlightText('Type')}: {attributes['armor-class'].type}</td>
      <td> {p.highlightText('Hit Dice')}: {attributes['hit-points']['hit-die']}</td>
      <td> {p.highlightText('Speed')}: {attributes.speed}</td>
      </tr>
      </table>
    );
  }
}

export default MonsterAttributes;
