import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import utils from '../utils.js';

import Page from './Page.jsx';
import SearchBar from '../components/SearchBar.jsx';
import MonsterSelectionTile from '../components/MonsterSelectionTile.jsx';

import '../styles/Create.scss';

const API_BASE_URL = 'https://monsterserver.herokuapp.com/api/monsters/';

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isError         : false,
      error           : null,
      monsters        : [],
      selectedMonsters: {},
      searchTerm      : '',
      saved           : false,
    };

    this.handleSearchChange     = this.handleSearchChange.bind(this);
    this.handleMonsterTileClick = this.handleMonsterTileClick.bind(this);
    this.saveEncounter          = this.saveEncounter.bind(this);
  }
  componentDidMount() {
    let _monsters = sessionStorage.getItem('monsters');
    if (_monsters === null) {
      // Old Implementation using dnd5eapi.co 
      // Deprecated
      // fetch('http://www.dnd5eapi.co/api/monsters')
      //   .then((res) => { return res.json()})
      //   .then((response) => {
      //     let monsters = response.results.map((monster) => {
      //       monster.id = this.getMonsterId(monster);
      //       return monster;
      //     });
      fetch(API_BASE_URL)
        .then((res) => { return res.json()})
        .then((monsters) => {
          monsters = monsters.map((monster) => {
            return { 
              id: monster["Index"],
              name: monster["Name"],
              url: API_BASE_URL + monster["Index"],
            };
          });
          sessionStorage.setItem('monsters', JSON.stringify(monsters));
          this.setState({
            monsters: monsters
          });
        },
        (error) =>{
          this.setState({
            isError: true,
            error: error
          });
        })
    } else {
      this.setState({
        monsters: JSON.parse(_monsters)
      })
    }
  }
  render() {
    const { isError, selectedMonsters, saved } = this.state;

    if (saved) {
      return <Redirect to={{pathname: '/PlayerSelection', state: { monstersList: selectedMonsters}}} />
    }

    let contents;
    if (isError) {
      contents = <div>Something broke!</div>;
    } else {
      contents = this.buildMonsterList();
    }

    return (
      <Page
        id='create-page'
        title='Monsters'
        leading={<Link to={'/encounters'}>Back</Link>}
        trailing={<div onClick={this.saveEncounter}>Next</div>}>
        <input id='title' ref='title' type='text' placeholder='Goblin Ambush...' />
        <SearchBar placeHolder={'Search for monster...'} onChange={this.handleSearchChange}/>
        <div id='monster-grid'>
          { contents }
        </div>
        <ul id='bottom-sheet'>
          { this.getSelectionList() }
        </ul>
      </Page>
    );
  }

  buildMonsterList() {
    const { monsters, searchTerm, selectedMonsters } = this.state;

    if (monsters === null) return [];
    return monsters
    .filter((monster) => {
      return monster.name.match(new RegExp('.*' + searchTerm + ".*", "i"));
    })
    .map((monster) => {
     return (
      <MonsterSelectionTile
        key     = {monster.id}
        id      = {monster.id}
        name    = {monster.name}
        count   = {selectedMonsters[monster.id] ? selectedMonsters[monster.id].count : 0}
        onClick = {this.handleMonsterTileClick}/>);
    });
  }

  getSelectionList() {
    const { selectedMonsters } = this.state;
    let challengeRating = 0;
    let items = Object.keys(selectedMonsters).map((monsterId) => {
      let monster = selectedMonsters[monsterId];
      if ( monster.details != null) {
        challengeRating += eval(monster.details.traits.challenge.split(' ')[0]) * monster.count;
      }
      return (
        <li>
          <span>{`${monster.count}x ${monster.name}`}</span>
          <span>{`${monster.details ? eval(monster.details.traits.challenge.split(' ')[0]) * monster.count : 0}`}</span></li>
      )
    });
    items.push(<li className='hline'></li>);
    items.push(<li className='total'><h3>Total XP</h3><h3>{`${challengeRating}`}</h3></li>)
    return items;
  }

  getMonsterId(monsterObj) {
    let parts = monsterObj.url.split('/');
    let id = parts[parts.length - 1];
    console.log(id);
    return id;
  }

  handleSearchChange({ target }) {
    this.setState({
      searchTerm: target.value
    });
  }

  handleMonsterTileClick(monsterId, button) {
    let { monsters, selectedMonsters } = this.state;
    if (!(monsterId in selectedMonsters)) {
      if (button === 'add') {
        selectedMonsters[monsterId] = {
          count  : 1,
          name: monsters[monsterId].name,
          details: null,
          // url: monsters[monsterId - 1].url,
          url: API_BASE_URL + monsterId,
        };
        this.fetchMonsterDetails(monsters[monsterId]);
      }
    } else {
      if (button === 'add') {
        selectedMonsters[monsterId].count += 1;
      }
      if (button === 'remove') {
        selectedMonsters[monsterId].count -= 1;
        if (selectedMonsters[monsterId].count < 1) {
          delete selectedMonsters[monsterId];
        }
      }
    }

    this.setState({
      selectedMonsters: selectedMonsters
    });
  }

  fetchMonsterDetails(monster) {
    const { id, url } = monster;
    fetch(url)
      .then((res) => { return res.json()})
      .then((success) => {
        let { selectedMonsters } = this.state;
        if (selectedMonsters[id] == null ) return;
        selectedMonsters[id].details = success;
        this.setState({
          selectedMonsters: selectedMonsters
        });
      },
      (error) => {
        this.setState({
          isError: true,
          error  : error,
        })
      });
  }

  saveEncounter() {
    const { selectedMonsters } = this.state;
    let newEncounter = {
      name: this.refs.title.value || 'New Encounter',
      selectedMonsters: selectedMonsters,   
    };
    utils.saveEncounterToStorage(newEncounter);

    this.setState({
      saved: true,
    });
  }
}

export default Create;
