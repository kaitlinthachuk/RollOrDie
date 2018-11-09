import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import Page from './Page.jsx';

class Parties extends Component {
  constructor(props) {
    super(props);
    let savedParties = localStorage.getItem('savedParties');
    this.savedParties = savedParties ? JSON.parse(savedParties) : [];
  }

  render() {
    return (
      <Page 
        id='parties-page'
        title='Your Parties'
        leading={<Link to={'/'}>Back</Link>}
        trailing={<Link to={'/parties/new'}>Add Party</Link>}
        >
        <ul>
          { 
            this.savedParties.map((party) => {
              return <li>{party.name}</li>
            })
          }
        </ul>
      </Page>
    );
  }
}

export default Parties;