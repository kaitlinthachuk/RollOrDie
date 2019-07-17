import React, { Component } from 'react';

class MonsterTraits extends Component {

  extractTraits(traits, highlightText, capitalize){
    let pContent = [];

    Object.entries(traits).forEach(function(trait, index) {
      if(trait[0] !== "challenge"){
      pContent.push(<p key = {index}>{highlightText(capitalize(trait[0]))} : {trait[1]} </p>);
    }});
      return pContent;
  }

  render() {
    const { traits, highlightText, capitalize } = this.props;

    return (
      <div className = "monster-traits">
      {this.extractTraits(traits, highlightText, capitalize)}
      </div>
    );
  }
}

export default MonsterTraits;
