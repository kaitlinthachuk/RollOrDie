import React, { Component } from 'react';

import '../styles/MonsterSelectionTile.scss';

class MonsterSelectionTile extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const { name, count } = this.props;

    return (
      <div className={'monster-selection-tile' + (count > 0 ? ' selected' : '')}  onClick={this.handleClick}>
        <div>{name}</div>
        <div>{count}</div>
      </div>
    );
  }

  handleClick() {
    const { id, onClick } = this.props;
    onClick(id);
  }
}

export default MonsterSelectionTile;