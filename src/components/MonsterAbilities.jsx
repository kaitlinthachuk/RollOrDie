import React, { Component } from 'react';

class MonsterAbilities extends Component {
  render() {
    const { abilities, highlightText } = this.props;

    return (
      <div className = "monster-abilities">
      <p> {highlightText('Cha')}: {abilities.cha.score} ({abilities.cha.modifier}) </p>
      <p> {highlightText('Con')}: {abilities.con.score} ({abilities.con.modifier}) </p>
      <p> {highlightText('Dex')}: {abilities.dex.score} ({abilities.dex.modifier}) </p>
      <p> {highlightText('Int')}: {abilities.int.score} ({abilities.int.modifier}) </p>
      <p> {highlightText('Str')}: {abilities.str.score} ({abilities.str.modifier}) </p>
      <p> {highlightText('Wis')}: {abilities.wis.score} ({abilities.wis.modifier}) </p>
      </div>
    );
  }
}

export default MonsterAbilities;
