import React, { Component } from 'react';

import '../styles/Navbar.scss';

class Navbar extends Component {
  render() {
    const { leading, trailing, title } = this.props;
    return (
      <div className='navbar'>
        <div className='navbar-box'><div className='nav-button'>{leading}</div></div>
        <div className='navbar-box'><h2>{title}</h2></div>
        <div className='navbar-box'><div className='nav-button'>{trailing}</div></div>
      </div>
    );
  }
}

export default Navbar;