import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { storage, constants} from '../utils.js';

import Page from './Page.jsx';
import SearchBar from '../components/SearchBar.jsx';

import '../styles/Create.scss';
import MonsterSelectionGrid from '../components/MonsterSelectionGrid.jsx';

const API_BASE_URL = 'https://monsterserver.herokuapp.com/api/monsters/';

class Create extends Component {
  constructor(props) {
    super(props);

    let passedEncounter;
    let encounterUid = props.match.params && props.match.params.uid ? props.match.params.uid : null;

    if (encounterUid) {
      passedEncounter = storage.getEncounterFromStorage(encounterUid);
    } else {
      passedEncounter = storage.saveEncounterToStorage({
        title: '',
        selectedMonsters: {},
        stage: constants.EncounterStage.CREATED,
      })
    }
    // if (props.location && props.location.state && props.location.state.encounter) {
    //   let _passedEncounter = props.location.state.encounter;
    //   _passedEncounter.stage = constants.EncounterStage.CREATED;
    //   passedEncounter = storage.saveEncounterToStorage(props.location.state.encounter);

    // } else {
    //   passedEncounter = storage.saveEncounterToStorage({
    //     title: "",
    //     selectedMonsters: {},
    //     stage: constants.EncounterStage.CREATED,
    //   });
    // }

    this.state = {
      isError   : false,
      error     : null,
      monsters  : [],
      encounter : passedEncounter,
      searchTerm: '',
      saved     : false,
      loading   : true,
    };

    this.handleTitleChange      = this.handleTitleChange.bind(this);
    this.handleSearchChange     = this.handleSearchChange.bind(this);
    this.handleMonsterTileClick = this.handleMonsterTileClick.bind(this);
    this.saveEncounter          = this.saveEncounter.bind(this);
    this.fetchMonsters          = this.fetchMonsters.bind(this);
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

      this.fetchMonsters();

    } else {
      this.setState({
        monsters: JSON.parse(_monsters),
        loading: false
      })
    }
  }
  render() {
    const { isError, encounter, saved, loading } = this.state;

    if (saved) {
      return <Redirect to={{pathname: '/PlayerSelection', state: { encounter: encounter}}} />
    }

    let contents;
    if (isError) {
      contents = <div>Something broke!
                    <div><button className= "reload-monsters" onClick = {() => this.fetchMonsters()}> Reload Monsters </button> </div>
                  </div>;
    } else if (loading) {
      contents = SVGSpinner;
    } else {
      contents = this.buildMonsterList();
    }

    return (
      <Page
        id='create-page'
        title='Monsters'
        leading={<Link to={'/encounters'}>Back</Link>}
        trailing={<div onClick={this.saveEncounter}>Next</div>}>
        <input id='title' ref='title' type='text' onChange={this.handleTitleChange} value={encounter.title} placeholder='Goblin Ambush...' />
        <SearchBar placeHolder={'Search for monster...'} onChange={this.handleSearchChange}/>
        { contents }
        <ul id='bottom-sheet'>
          { this.getSelectionList() }
        </ul>
      </Page>
    );
  }

fetchMonsters(){
  this.setState({
    loading: true,
    isError: false
  })
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
        monsters: monsters,
        loading: false,
      });
    },
    (error) =>{
      this.setState({
        isError: true,
        error: error
      });
    })

}

  buildMonsterList() {
    const { monsters, searchTerm, encounter } = this.state;
    let monstersToDisplay = monsters
      .filter((monster) => {
        return monster.name.match(new RegExp('.*' + searchTerm + ".*", "i"));
      })
      .map((monster) => {
        let _monster = Object.assign({}, monster);
        _monster.count = encounter.selectedMonsters[monster.id] ? encounter.selectedMonsters[monster.id].count : 0;
        return _monster;
      })
    // .map((monster) => {
    //  return (
    //   <MonsterSelectionTile
    //     key     = {monster.id}
    //     id      = {monster.id}
    //     name    = {monster.name}
    //     count   = {encounter.selectedMonsters[monster.id] ? encounter.selectedMonsters[monster.id].count : 0}
    //     onClick = {this.handleMonsterTileClick}/>);
    // });
    return <MonsterSelectionGrid monsters={monstersToDisplay} onMonsterTileClick={this.handleMonsterTileClick}/>

  }

  getSelectionList() {
    const { encounter } = this.state;
    let challengeRating = 0;


    let items = Object.values(encounter.selectedMonsters).map((monster, index) => {

      if (monster.details != null) {
        challengeRating +=  eval(monster.details.traits.challenge.split(' ')[0]) * monster.count;
      }
      return (
        <li key={index}>
          <span>{`${monster.count}x ${monster.name}`}</span>
          <span>{`${monster.details ?  eval(monster.details.traits.challenge.split(' ')[0]) * monster.count : 0}`}</span></li>
      )
    });
    items.push(<li key = '99' className='hline'></li>);
    items.push(<li key = "100"className='total'><h3>Total XP</h3><h3>{`${challengeRating}`}</h3></li>)
    if(!Object.keys(encounter.selectedMonsters).length){
      items.push(<li key = "101" className = "validation"> Please select at least one monster to continue</li>)
    }
    return items;
  }

  getMonsterId(monsterObj) {
    let parts = monsterObj.url.split('/');
    let id = parts[parts.length - 1];
    return id;
  }

  handleSearchChange({ target }) {
    this.setState({
      searchTerm: target.value
    });
  }

  handleTitleChange({ target }) {
    const { encounter } = this.state;
    encounter.title = target.value;
    this.setState({
      encounter: encounter,
    });
  }

  handleMonsterTileClick(monsterId, button) {
    let { monsters, encounter } = this.state;
    if (!(monsterId in encounter.selectedMonsters)) {
      if (button === 'add') {
        encounter.selectedMonsters[monsterId] = {
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
        encounter.selectedMonsters[monsterId].count += 1;
      }
      if (button === 'remove') {
        encounter.selectedMonsters[monsterId].count -= 1;
        if (encounter.selectedMonsters[monsterId].count < 1) {
          delete encounter.selectedMonsters[monsterId];
        }
      }
    }

    this.setState({
      encounter: encounter,
    });
  }

  fetchMonsterDetails(monster) {
    const { id, url } = monster;
    fetch(url)
      .then((res) => { return res.json()})
      .then((success) => {
        let { encounter } = this.state;
        if (encounter.selectedMonsters[id] == null ) return;
        encounter.selectedMonsters[id].details = success;
        this.setState({
          encounter: encounter,
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
    let { encounter } = this.state;
    if(Object.keys(encounter.selectedMonsters).length){
    encounter.stage = constants.EncounterStage.MONSTERS_SELECTED;
    encounter = storage.saveEncounterToStorage(encounter);
    this.setState({
      saved: true,
      encounter: encounter,
    });
  }
  }
}

const SVGSpinner =
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g>
      <circle className={'spinner'} cx={50} cy={50} r={25} />
      <circle className={'spinner-inner'} cx={50} cy={50} r={15} />
      {/* <path d='M 50 50 a 25 25 0 0 1 5 50' stroke='blue' stroke-width={2}/> */}
      </g>
    </svg>;

export default Create;
