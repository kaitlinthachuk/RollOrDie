import React, { Component } from 'react';

import '../styles/SearchBar.scss';

class SearchBar extends Component {
  render() {
    const { onChange, placeHolder } = this.props;
    return (
      <input type='text' className='search-bar' placeholder={placeHolder} onChange={onChange} />
    );
  }
}

export default SearchBar