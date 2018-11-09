import React, { Component } from 'react';

class MonsterAbilities extends Component {
  render() {
    var p = this.props;
    var abilities = p.abilities;
    return (
      <div>
      <h4>Abilities</h4>
      <p> {p.highlightText('Cha')}: {abilities.cha.score} ({abilities.cha.modifier})  {p.highlightText('Con')}: {abilities.con.score} ({abilities.con.modifier})
      {p.highlightText('Dex')}: {abilities.dex.score} ({abilities.dex.modifier}) {p.highlightText('Int')}: {abilities.int.score} ({abilities.int.modifier})
      {p.highlightText('Str')}: {abilities.str.score} ({abilities.str.modifier}) {p.highlightText('Wis')}: {abilities.wis.score} ({abilities.wis.modifier})</p>
      </div>
    );
  }
}

export default MonsterAbilities;
