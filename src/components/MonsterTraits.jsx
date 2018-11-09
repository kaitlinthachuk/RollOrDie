import React, { Component } from 'react';

class MonsterTraits extends Component {
  extractTraits(traits, highlightText, capitalize){
    var pContent = [];
    Object.entries(traits).forEach(function(trait) {
      if(trait[0] !== "challenge"){
      pContent.push(<p>{highlightText(capitalize(trait[0]))} : {trait[1]} </p>);
    }});
      return pContent;
  }
  render() {
    var p = this.props;
    var traits = p.traits;

    return (
      <div>
      <h3>Monster Traits</h3>
      {this.extractTraits(traits, p.highlightText, p.capitalize)}
      </div>
    );
  }
}

export default MonsterTraits;
