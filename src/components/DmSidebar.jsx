import React, { Component } from 'react';
import '../styles/DmSidebar.scss';
import HP from './HP.jsx';

class DmSidebar extends Component {
  render() {
    var rankedList = this.props.rankedList;
    
    return (
      <div className = "dm-sidebar">
        <h4>DM Cheatsheet!</h4>
      </div>
    )
  }
}

export default DmSidebar;
