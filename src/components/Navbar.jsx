import React, { Component } from 'react';

import '../styles/Navbar.scss';

class Navbar extends Component {
  render() {
    const { leading, trailing } = this.props;
    return (
      <div className='navbar'>
        <div className='nav-button'>{leading}</div>
        <h2>Title</h2>
        <div className='nav-button'>{trailing}</div> 
      </div>
    );
  }
}

export default Navbar;