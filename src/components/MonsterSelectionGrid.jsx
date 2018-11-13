import React, { Component } from 'react';
import MonsterSelectionTile from './MonsterSelectionTile.jsx';

import '../styles/MonsterSelectionGrid.scss';

class MonsterSelectionGrid extends Component {
  shouldComponentUpdate(nextProps, nextState) {

    return (this.props.monsters.length !== nextProps.monsters.length) ||
      this.props.monsters.some((monster, index) => {
        return (monster.count !== nextProps.monsters[index].count);
      });
  }

  render() {
    const { monsters, onMonsterTileClick } = this.props;

    if (monsters === null) return null;
    return (
      <div id='monster-grid'>
        { monsters
            .map((monster) => {
              return (
                <MonsterSelectionTile
                  key     = {monster.id}
                  id      = {monster.id}
                  name    = {monster.name}
                  count   = {monster.count}
                  onClick = {onMonsterTileClick}/>
                );
            }) 
          }
        </div>
    )
  }
}

export default MonsterSelectionGrid;