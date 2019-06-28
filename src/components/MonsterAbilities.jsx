import React, { Component } from 'react';

class MonsterAbilities extends Component {
  render() {
    var p = this.props;
    var abilities = p.abilities;
    return (
      <table className = "monster-abilities-table">
      <tr>
      <th>Abilities</th>
      <td> {p.highlightText('Cha')}: {abilities.cha.score} ({abilities.cha.modifier}) </td>
      <td> {p.highlightText('Con')}: {abilities.con.score} ({abilities.con.modifier}) </td>
      <td>{p.highlightText('Dex')}: {abilities.dex.score} ({abilities.dex.modifier}) </td>
      <td> {p.highlightText('Int')}: {abilities.int.score} ({abilities.int.modifier}) </td>
      <td> {p.highlightText('Str')}: {abilities.str.score} ({abilities.str.modifier}) </td>
      <td> {p.highlightText('Wis')}: {abilities.wis.score} ({abilities.wis.modifier})</td>
      </tr>
      </table>
    );
  }
}

export default MonsterAbilities;
