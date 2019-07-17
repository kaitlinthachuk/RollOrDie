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

    if (props.location && props.location.state && props.location.state.playerList && props.location.state.monsterList) {
      this.state.playerList = props.location.state.playerList;
      this.state.monsterList = props.location.state.monsterList;
    } else {
      throw new Error('Encounter is missing either playerlist or monsterlist');
    }
  }
  componentDidMount() {
    console.log(this.state.playerList);
    let monsterList = this.generateMonsterInitiatives(this.state.monsterList);
    this.rankedList = this.getIntiativeRanking(monsterList, this.state.playerList);

    this.setState({
      monsterList: monsterList,
      })

  }
  nextTurn() {
    const { currentParticipantIndex, roundCount } = this.state;
    let lastIndex = this.rankedList.length - 1;
    let shouldResetIndex = currentParticipantIndex === lastIndex;
    let index =  shouldResetIndex ? 0 : currentParticipantIndex + 1;
    let round = shouldResetIndex ? roundCount + 1 : roundCount;

    this.setState({
      currentParticipantIndex: index,
      roundCount: round
    });
  }

  updateConsciousness(name){
    const { playerList } = this.state;


    for(var i = 0; i < playerList.length; i++){
      if(playerList[i].name === name){
        playerList[i].unconscious = !playerList[i].unconscious;
      }
    }

    this.setState({
      playerList : playerList
    })
  }
  updateHp(newHp, monsterIndex, monsterName) {
    const { monsterList } = this.state;
    let monsterListArray = Object.entries(monsterList);

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
      let rolld20     = Math.floor(Math.random() * 20) + 1;
      let  dexMod      = monster[1].details.abilities.dex.modifier;
      let  initiative  = rolld20 + dexMod;
      monsterList[index][1].initiative = initiative;
      monsterList[index][1].participant = 'monster';
      monsterList[index][1].hpList = Array(monster[1].count).fill(monster[1].details.attributes['hit-points'].total);
    });
    return monsterList;
  }
  getIntiativeRanking(monsterList, playerList) {
    for (var i = 0; i < playerList.length; i++) {
      playerList[i].participant = 'player';
      playerList[i].unconscious = false;
    }
    let totalList = playerList;
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
    let generatedComponents = [],
        rankedList          = this.rankedList,
        updateHp            = this.updateHp,
        updateConsciousness = this.updateConsciousness;

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
        leading={<Link to = {'/'}>End Combat</Link>}
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
