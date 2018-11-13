import React, { Component } from 'react';

import '../styles/MonsterSelectionTile.scss';

class MonsterSelectionTile extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.count !== nextProps.count;
  }

  render() {
    const { name, count, id, onClick } = this.props;

    return (
      <div 
        className={'monster-selection-tile' + (count > 0 ? ' selected' : '') }
        onClick={this.handleClick}
      >
        <div className='monster-name'>{name}</div>
        <div className='remove-btn' onClick={() => { onClick(id, 'remove')}}>-</div>
        <div className='count'>{count}</div>
        <div className='add-btn'onClick={() => { onClick(id, 'add')}}>+</div>
      </div>
    );
  }
}

export default MonsterSelectionTile;