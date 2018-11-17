import React, { Component } from 'react';

import Navbar from '../components/Navbar.jsx';
import BottomNavbar from '../components/BottomNavbar.jsx';

import '../styles/Page.scss';
import ModalDialog from '../components/ModalDialog.jsx';
import TabBar from '../components/TabBar.jsx';

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
    };

    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentDidUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  render() {
    const { leading, trailing, bottom, id, title, leftSidebar, leftSidebarTitle, rightSidebar, rightSidebarTitle } = this.props;
    const { width } = this.state;
    return (
      <div className="layout">
        <Navbar leading={leading} title={title} trailing={trailing}></Navbar>
        <div id={id} className="page">
          {this.props.children}
        </div>
        { (width <= 1000 && ( leftSidebar || rightSidebar)) ? 
        <TabBar 
          leftTabTitle={leftSidebarTitle}
          leftTabContent={leftSidebar}
          rightTabTitle={rightSidebarTitle}
          rightTabContent={rightSidebar}
        /> : 
          [
          <div className='left-side-bar'>{leftSidebar}</div>,
          <div className='right-side-bar'>{rightSidebar}</div>,
          ]
        }
        <BottomNavbar>{bottom}</BottomNavbar>
      </div>
    );
  }

  handleWindowResize() {
    this.setState({
      width: window.innerWidth,
    })
  }
}

export default Page;