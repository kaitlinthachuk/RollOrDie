import React, { Component } from 'react';

class MonsterTraits extends Component {
  extractTraits(traits, highlightText, capitalize){
    var pContent = [];
    Object.entries(traits).forEach(function(trait, index) {
      if(trait[0] !== "challenge"){
      pContent.push(<td key = {index}>{highlightText(capitalize(trait[0]))} : {trait[1]} </td>);
    }});
      return pContent;
  }
  render() {
    var p = this.props;
    var traits = p.traits;

    return (
      <table className = "monster-traits-table">
      <tr>
      <th>Traits</th>
      {this.extractTraits(traits, p.highlightText, p.capitalize)}
      </tr>
      </table>
    );
  }
}

export default MonsterTraits;
