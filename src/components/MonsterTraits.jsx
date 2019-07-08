import React, { Component } from 'react';

class MonsterTraits extends Component {
  extractTraits(traits, highlightText, capitalize){
    var pContent = [];
    Object.entries(traits).forEach(function(trait, index) {
      if(trait[0] !== "challenge"){
      pContent.push(<p key = {index}>{highlightText(capitalize(trait[0]))} : {trait[1]} </p>);
    }});
      return pContent;
  }
  render() {
    var p = this.props;
    var traits = p.traits;

    return (
      <div className = "monster-traits">
      {this.extractTraits(traits, p.highlightText, p.capitalize)}
      </div>
    );
  }
}

export default MonsterTraits;
