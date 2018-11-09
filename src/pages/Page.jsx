import React, { Component } from 'react';

import Navbar from '../components/Navbar.jsx';
import BottomNavbar from '../components/BottomNavbar.jsx';


class Page extends Component {
  render() {
    const { leading, trailing, bottom, id, title } = this.props;
    return (
      <div className="layout">
        <Navbar leading={leading} title={title} trailing={trailing}></Navbar>
        <div id={id} className="page">
          {this.props.children}
        </div>
        <BottomNavbar>{bottom}</BottomNavbar>
      </div>
    );
  }
}

export default Page;