import React, { Component } from 'react';
import Player from '../components/Player.jsx';
import Monster from '../components/Monsters.jsx';
import Carousel from '../components/Carousel.jsx';
import DmSidebar from '../components/DmSidebar.jsx';
import RoundCounterManager from '../components/RoundCounterManager.jsx';
import Page from './Page.jsx';
import { Link } from "react-router-dom";

import '../styles/EncounterManager.scss';

class EncounterManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monsterList: {},
      playerList: [],
      currentParticipantIndex: 0,
      roundCount: 1
    };

    this.rankedList = [];
    this.updateHp = this.updateHp.bind(this);
    this.updateConsciousness = this.updateConsciousness.bind(this);
    this.nextTurn = this.nextTurn.bind(this);
  }
  componentDidMount() {    
    var recievedPlayers = this.props.location.state.playerList;
    var monsterList = this.generateMonsterInitiatives(this.props.location.state.monsterList);
    this.rankedList = this.getIntiativeRanking(monsterList, recievedPlayers);

    this.setState({
      playerList: recievedPlayers,
      monsterList: monsterList,
      })

  }
  nextTurn() {
    var lastIndex = this.rankedList.length - 1;
    var currentIndex = this.state.currentParticipantIndex;
    var currentRound = this.state.roundCount;
    const shouldResetIndex = currentIndex === lastIndex;
    const index =  shouldResetIndex ? 0 : currentIndex + 1;
    const round = shouldResetIndex ? currentRound + 1 : currentRound;
    this.setState({
      currentParticipantIndex: index,
      roundCount: round
    });
  }
  updateConsciousness(name){
    var playerList = this.state.playerList;
    console.log(name);

    for(var i = 0; i < playerList.length; i++){
      if(playerList[i].name === name){
        playerList[i].unconscious = !playerList[i].unconscious;
      }
    }
    console.log(playerList);

    this.setState({
      playerList : playerList
    })
  }
  updateHp(newHp, monsterIndex, monsterName) {
    var monsterList = this.state.monsterList

    var monsterListArray = Object.entries(monsterList);
    debugger;
    for (var i = 0; i < monsterListArray.length; i++) {
      var monsterObj = monsterListArray[i][1];
      if (monsterObj.details.name === monsterName) {
        monsterObj.hpList[monsterIndex] = newHp;
        monsterList[i + 1] = monsterObj;
        break;
      }
    }
    this.setState({
      monsterList: monsterList
    });
  }
  generateMonsterInitiatives(monsterList) {
    Object.entries(monsterList).forEach(function (monster, index, monsterList) {
      var rolld20 = Math.floor(Math.random() * 20) + 1;
      var dexMod = monster[1].details.abilities.dex.modifier;
      var initiative = rolld20 + dexMod;
      monsterList[index][1].initiative = initiative;
      monsterList[index][1].participant = 'monster';
      monsterList[index][1].hpList = Array(monster[1].count).fill(monster[1].details.attributes['hit-points'].total);
    });
    return monsterList;
  }
  getIntiativeRanking(monsterList, playerList) {
    var i;
    for (i = 0; i < playerList.length; i++) {
      playerList[i].participant = 'player';
      playerList[i].unconscious = false;
    }
    var totalList = playerList;
    Object.entries(monsterList).forEach(function (monster) {
      totalList.push(monster[1]);
    });

    totalList.sort(function (a, b) {
      if (a.initiative < b.initiative) {
        return 1;
      }
      if (a.initiative > b.initiative) {
        return -1;
      }
      return 0;
    })
    return totalList;
  }
  render() {
    var generatedComponents = [];
    var rankedList = this.rankedList;
    var updateHp = this.updateHp;
    var updateConsciousness = this.updateConsciousness;

    rankedList.forEach(function (element, index) {
      if (element.participant === 'player') {
        generatedComponents.push(<Player name={element.name} ac={element.ac} unconscious = {element.unconscious}
          updateConsciousness = {updateConsciousness} key={index}> </Player>);
      }
      else {
        generatedComponents.push(<Monster monster={element} updateHp={updateHp} key={index} > </Monster>);
      }
    })

    return (
      <Page
        id='encounter-page'
        title="Encounter"
        leading={<Link to={'/PlayerSelection'}>Back</Link>}
        trailing={<Link to = {'/'}>End Combat</Link>}
        leftSidebar = {<DmSidebar rankedList={rankedList} updateHp={this.updateHp}
        leftSidebarTitle = {'DM CheatSheet'}
        updateConsciousness = {this.updateConsciousness}></DmSidebar>}
        leftSidebarTitle = {'DM CheatSheet'}
        rightSidebar = {<RoundCounterManager roundCount = {this.state.roundCount} currentParticipantIndex = {this.state.currentParticipantIndex}
                          rankedList = {rankedList}/>}
        rightSidebarTitle = {'Round Counter'}
        >
        <Carousel children={generatedComponents} roundCount = {this.state.roundCount} currentParticipantIndex = {this.state.currentParticipantIndex}
        nextTurn = {this.nextTurn}></Carousel>
      </Page>
    );
  }
}

export default EncounterManager;
