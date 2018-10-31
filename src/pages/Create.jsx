import React, { Component } from 'react';
import { BrowserRouter as Link } from "react-router-dom";

import Page from './Page.jsx';
import SearchBar from '../components/SearchBar.jsx';
import MonsterSelectionTile from '../components/MonsterSelectionTile.jsx';

import '../styles/Create.scss';

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isError: false,
      error: null,
      monsters: [],
      selectedMonsters: {},
      searchTerm: ''
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleMonsterTileClick = this.handleMonsterTileClick.bind(this);
  }
  componentDidMount() {
    let _monsters = sessionStorage.getItem('monsters');
    if (_monsters === null) {
      fetch('http://www.dnd5eapi.co/api/monsters')
        .then((res) => { return res.json()})
        .then((response) => {
          let monsters = response.results.map((monster) => {
            monster.id = this.getMonsterId(monster);
            return monster;
          });
          sessionStorage.setItem('monsters', JSON.stringify(monsters));
          this.setState({
            monsters: monsters
          }); 
        },
        (error) =>{
          this.setState({
            hasError: true,
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
    const { isError, error } = this.state;
    
    let contents;
    if (isError) {
      contents = <div>{error}</div>;
    } else {
      contents = this.buildMonsterList();
    }

    return (
      <Page id='create-page' leading={<Link to={'/'}>Back</Link>}>
        <SearchBar placeHolder={'Search for monster...'} onChange={this.handleSearchChange}/>
        <div id='monster-grid'>
          { contents }
        </div>
      </Page>
    );
  }

  buildMonsterList() {
    const { monsters, searchTerm, selectedMonsters } = this.state;
    
    if (monsters === null) return [];
    return monsters
    .filter((monster) => {
      return monster.name.match(new RegExp('.*' + searchTerm + ".*", "i")) || selectedMonsters[monster.id] != null;
    })
    .map((monster) => {
     return (
      <MonsterSelectionTile id={monster.id} name={monster.name} count={selectedMonsters[monster.id] ? selectedMonsters[monster.id] : 0} onClick={this.handleMonsterTileClick}/>);
    });
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

  handleMonsterTileClick(monsterId) {
    let { selectedMonsters } = this.state;
    let counter = selectedMonsters[monsterId];
    if (counter == null) {
      selectedMonsters[monsterId] = 1;
    } else {
      selectedMonsters[monsterId] += 1;
    }

    this.setState({
      selectedMonsters: selectedMonsters 
    });
  }
}

export default Create;