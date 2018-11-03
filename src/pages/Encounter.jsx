import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Page from './Page.jsx';
import '../styles/Encounter.scss'
import EncounterManager from '../components/EncounterManager.jsx'

class Encounter extends Component {
  constructor() {
    super();
    this.state = {playerList: [], monsterList: []};
  }
  componentDidMount() {
    var recievedState = this.props.location.state;
    console.log(recievedState);
    this.setState(recievedState)
  }
  render(){
    return (
      <Page
        id='encounter-page'
        leading={<Link to={'/PlayerSelection'}>Back</Link>}
        trailing={<Link to={'/'}>Next</Link>}>
      <EncounterManager playerList = {this.state.playerList} monsterList = {this.state.monsterList}></EncounterManager>
    </Page>
    );
  }

}

export default Encounter;
