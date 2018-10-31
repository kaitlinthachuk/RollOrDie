import React, { Component } from 'react';
import '../styles/Navbar.scss';

class Navbar extends Component {
  render() {
    return (
      <div className='navbar'>
        <button>PREV</button>
        <h2>Title</h2>
        <button>NEXT</button> 
      </div>
    );
  }
}

export default Navbar;