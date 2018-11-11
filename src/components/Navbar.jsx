import React, { Component } from 'react';

import '../styles/Navbar.scss';

class Navbar extends Component {
  render() {
    const { leading, trailing, title } = this.props;
    return (
      <div className='navbar'>
        <div className='navbar-box'><h3 className='nav-button'>{leading}</h3></div>
        <div className='navbar-box'><h2>{title}</h2></div>
        <div className='navbar-box'><h3 className='nav-button'>{trailing}</h3></div>
      </div>
    );
  }
}

export default Navbar;