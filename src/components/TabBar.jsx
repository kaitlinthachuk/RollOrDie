import React, { Component } from 'react';

//styles
import '../styles/TabBar.scss';

class TabBar extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      activeIndex: -1,
    }

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  compenentDidUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { leftTabTitle, leftTabContent, rightTabTitle, rightTabContent } = this.props;
    const { activeIndex } = this.state;

    return (
      <div className='tab-bar'>
        <div className={`left-tab-content ${activeIndex === 0 ? 'active' : ''}`}>{ leftTabContent }</div>
        <div className={`right-tab-content ${activeIndex === 1 ? 'active' : ''}`}>{ rightTabContent }</div>
        <div className='tab-titles'>
          { leftTabContent ? 
            <div className='left-tab-title' onClick={() => this.handleTabClick(0)}>{ leftTabTitle }</div> : null 
          }
          { rightTabContent ? 
            <div className='right-tab-title' onClick={() => this.handleTabClick(1)}>{ rightTabTitle }</div> : null 
          }
        </div>
      </div> 
    );
  }

  handleTabClick(index) {
    const { activeIndex } = this.state;
    this.setState({
      activeIndex: activeIndex === index ? -1 : index,
    });
  }

  handleKeyDown(event) {
    if (event.keyCode === 27) {
      this.setState({
        activeIndex: -1,
      });
    }
  }

}

export default TabBar;