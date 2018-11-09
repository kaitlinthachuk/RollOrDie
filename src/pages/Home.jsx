import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Page from './Page.jsx';

// Styles
import '../styles/Home.scss'

class Home extends Component {
  render() {
    return (
      <Page
        id='home-page'
        title='Roll Or Die'
      >
          <Link id='parties-jumbo' to={'/parties'}><h2 className='tile'>Parties</h2></Link>
          <Link id='encounters-jumbo' to={'/encounters'}><h2 className='tile'>Encounters</h2></Link>
      </Page>
    );
  }
}

export default Home;