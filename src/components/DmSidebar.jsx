import React, { Component } from 'react';
import '../styles/DmSidebar.scss';
import Player from './Player.jsx';
import SidebarMonster from './SidebarMonster.jsx';


class DmSidebar extends Component {
  render() {
    const { rankedList, updateHp, updateConsciousness } = this.props;
    let generatedComponents = [];

    rankedList.forEach(function (element, index) {
      if (element.participant === 'player') {
        generatedComponents.push(<Player name={element.name} ac={element.ac} unconscious = {element.unconscious}
          updateConsciousness = {updateConsciousness} key={index}> </Player>);
          generatedComponents.push(<hr className="hr"/>);
      }
      else {
        generatedComponents.push(<SidebarMonster monster={element} updateHp={updateHp} key={index} > </SidebarMonster>);
        generatedComponents.push(<hr className="hr"/>);
      }
    })

    return (
      <div className = "dm-sidebar">
        <h4>DM Cheatsheet!</h4>
        {generatedComponents}
      </div>
    )
  }
}

export default DmSidebar;
