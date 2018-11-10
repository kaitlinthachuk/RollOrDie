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
          <Link id='parties-jumbo' to={'/parties'}><h1 className='tile'>Parties</h1></Link>
          <Link id='encounters-jumbo' to={'/encounters'}><h1 className='tile'>Encounters</h1></Link>
      </Page>
    );
  }
}

export default Home;