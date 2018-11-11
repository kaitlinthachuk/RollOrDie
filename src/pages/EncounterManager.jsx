import React, {Component} from 'react';
import Player from '../components/Player.jsx';
import Monster from '../components/Monsters.jsx';
import Carousel from '../components/Carousel.jsx';
import DmSidebar from '../components/DmSidebar.jsx';
import Page from './Page.jsx';
import { Link } from "react-router-dom";

import '../styles/EncounterManager.scss';

class EncounterManager extends Component {
  constructor (props) {
    super(props);
    this.state = {
      monsterList: {},
      playerList: []
    };

    this.rankedList = [];
    this.updateHp = this.updateHp.bind(this);
  }
  componentDidMount() {
    //var recievedMonsters = this.props.location.state.monsterList;
    //var recievedPlayers = this.props.location.state.playerList;

    var playerList = [{
      name: "Kaitlin",
      ac: '18',
      initiative: '22'
    }, {
      name: 'Janik',
      ac: '19',
      initiative: '13'
    }]

    var monsterList = {
      1: {
        "count": 3,
"index": 300,
"name": "Worg",
"size": "large",
"alignment": "neutral evil",
"type": "monstrosity",
"attributes": {
  "armor-class": {
    "score": 13,
    "type": "Natural Armor"
  },
  "hit-points": {
    "hit-die": "4d10 + 4",
    "total": 26
  },
  "speed": "50 ft."
},
"abilities": {
  "cha": {
    "modifier": -1,
    "score": 8
  },
  "con": {
    "modifier": 1,
    "score": 13
  },
  "dex": {
    "modifier": 1,
    "score": 13
  },
  "int": {
    "modifier": -2,
    "score": 7
  },
  "str": {
    "modifier": 3,
    "score": 16
  },
  "wis": {
    "modifier": 0,
    "score": 11
  }
},
"traits": {
  "challenge": "1/2 100 XP",
  "languages": "Goblin, Worg",
  "senses": "Darkvision 60 ft.,  Passive Perception 14",
  "skills": "Perception +4"
},
"actions": {
  "actions": [
    {
      "attack-bonus": 5,
      "damage-bonus": 3,
      "damage-die": "2d6",
      "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone.",
      "name": "Bite",
      "reach": 5
    }
  ],
  "passive": [
    {
      "description": "The worg has advantage on Wisdom (Perception) checks that rely on hearing or smell.",
      "name": "Keen Hearing and Smell"
    }
  ]
},
"flavor": "A worg is an evil predator that delights in hunting and devouring creatures weaker than itself. Cunning and malevolent, worgs roam across the remote wilderness or are raised by goblins and hobgoblins. Those creatures use worgs as mounts, but a worg will turn on its rider if it feels mistreated or malnourished. Worgs speak in their own language and Goblin, and a few learn to speak Common as well."
},
      2: {
        "count": 1,
"index": 3,
"name": "Adult Blue Dragon",
"size": "huge",
"alignment": "lawful evil",
"type": "dragon",
"attributes": {
  "armor-class": {
    "score": 19,
    "type": "Natural Armor"
  },
  "hit-points": {
    "hit-die": "18d12 + 108",
    "total": 225
  },
  "speed": "40 ft., burrow 30 ft., fly 80 ft."
},
"abilities": {
  "cha": {
    "modifier": 4,
    "score": 19
  },
  "con": {
    "modifier": 6,
    "score": 23
  },
  "dex": {
    "modifier": 0,
    "score": 10
  },
  "int": {
    "modifier": 3,
    "score": 16
  },
  "str": {
    "modifier": 7,
    "score": 25
  },
  "wis": {
    "modifier": 2,
    "score": 15
  }
},
"traits": {
  "challenge": "16 15,000 XP",
  "damage-immunities": "Lightning",
  "languages": "Common, Draconic",
  "saving-throws": "DEX +5, CON +11, WIS +7, CHA +9",
  "senses": "Blindsight 60 ft., Darkvision 120 ft.,  Passive Perception 22",
  "skills": "Perception +12, Stealth +5"
},
"actions": {
  "actions": [
    {
      "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.",
      "name": "Multiattack"
    },
    {
      "attack-bonus": 12,
      "damage-bonus": 7,
      "damage-die": "2d10",
      "description": "Melee Weapon Attack: +12 to hit, reach 10 ft., one target. Hit: 18 (2d10 + 7) piercing damage plus 5 (1d10) lightning damage.",
      "name": "Bite",
      "reach": 10
    },
    {
      "attack-bonus": 12,
      "damage-bonus": 7,
      "damage-die": "2d6",
      "description": "Melee Weapon Attack: +12 to hit, reach 5 ft., one target. Hit: 14 (2d6 + 7) slashing damage.",
      "name": "Claw",
      "reach": 5
    },
    {
      "attack-bonus": 12,
      "damage-bonus": 7,
      "damage-die": "2d8",
      "description": "Melee Weapon Attack: +12 to hit, reach 15 ft., one target. Hit: 16 (2d8 + 7) bludgeoning damage.",
      "name": "Tail",
      "reach": 15
    },
    {
      "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 17 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.",
      "name": "Frightful Presence"
    },
    {
      "damage-bonus": 0,
      "damage-die": "12d10",
      "description": "The dragon exhales lightning in a 90-­foot line that is 5 feet wide. Each creature in that line must make a DC 19 Dexterity saving throw, taking 66 (12d10) lightning damage on a failed save, or half as much damage on a successful one.",
      "name": "Lightning Breath (Recharge 5–6)"
    }
  ],
  "legendary-actions": [
    {
      "description": "The dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The dragon regains spent legendary actions at the start of its turn.",
      "name": "General"
    },
    {
      "description": "The dragon makes a Wisdom (Perception) check.",
      "name": "Detect"
    },
    {
      "description": "The dragon makes a tail attack.",
      "name": "Tail Attack"
    },
    {
      "damage-bonus": 7,
      "damage-die": "2d6",
      "description": "The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 20 Dexterity saving throw or take 14 (2d6 + 7) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
      "name": "Wing Attack (Costs 2 Actions)"
    }
  ],
  "passive": [
    {
      "description": "If the dragon fails a saving throw, it can choose to succeed instead.",
      "name": "Legendary Resistance (3/Day)"
    }
  ]
},
"flavor": "Blue dragons make their lairs in barren places, using their lightning breath and their burrowing ability to carve out crystallized caverns and tunnels beneath the sands.\nThunderstorms rage around a legendary blue dragon’s lair, and narrow tubes lined with glassy sand ventilate the lair, all the while avoiding the deadly sinkholes that are the dragon’s first line of defense.\nA blue dragon will collapse the caverns that make up its lair if that lair is invaded. The dragon then burrows out, leaving its attackers to be crushed and suffocated. When it returns later, it collects its possessions — along with the wealth of the dead intruders.\nLair Actions\nOn initiative count 20 (losing initiative ties), the dragon takes a lair action to cause one of the following effects; the dragon can’t use the same effect two rounds in a row: Part of the ceiling collapses above one creature that the dragon can see within 120 feet of it. The creature must succeed on a DC 15 Dexterity saving throw or take 10 (3d6) bludgeoning damage and be knocked prone and buried. The buried target is restrained and unable to breathe or stand up. A creature can take an action to make a DC 10 Strength check, ending the buried state on a success.\nA cloud of sand swirls about in a 20-foot-radius sphere centered on a point the dragon can see within 120 feet of it. The cloud spreads around corners. Each creature in the cloud must succeed on a DC 15 Constitution saving throw or be blinded for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.\nLightning arcs, forming a 5-foot-wide line between two of the lair’s solid surfaces that the dragon can see. They must be within 120 feet of the dragon and 120 feet of each other. Each creature in that line must succeed on a DC 15 Dexterity saving throw or take 10 (3d6) lightning damage. Regional Effects\nThe region containing a legendary blue dragon’s lair is warped by the dragon’s magic, which creates one or more of the following effects: Thunderstorms rage within 6 miles of the lair.\nDust devils scour the land within 6 miles of the lair. A dust devil has the statistics of an air elemental, but it can’t fly, has a speed of 50 feet, and has an Intelligence and Charisma of 1 (−5).\nHidden sinkholes form in and around the dragon’s lair. A sinkhole can be spotted from a safe distance with a successful DC 20 Wisdom (Perception) check. Otherwise, the first creature to step on the thin crust covering the sinkhole must succeed on a DC 15 Dexterity saving throw or fall 1d6 × 10 feet into the sinkhole. If the dragon dies, the dust devils disappear immediately, and the thunderstorms abate within 1d10 days. Any sinkholes remain where they are."
}

    }

    monsterList = this.generateMonsterInitiatives(monsterList);
    this.rankedList = this.getIntiativeRanking(monsterList, playerList);

    this.setState({
      playerList : playerList,//recievedMonsters,
      monsterList : monsterList//recievedPlayers
    })

  }
  updateHp(newHp, monsterIndex, monsterName){
    var monsterList = this.state.monsterList
    var monsterListArray = Object.entries(monsterList);

    for(var i = 0; i < monsterListArray.length; i ++){
      var monsterObj = monsterListArray[i][1];
      if(monsterObj.name === monsterName){
        monsterObj.hpList[monsterIndex] = newHp;
        monsterList[i + 1] = monsterObj;
        break;
      }
    }
    this.setState({
      monsterList : monsterList
    });
  }
  generateMonsterInitiatives(monsterList) {
    Object.entries(monsterList).forEach(function(monster, index, monsterList) {
      var rolld20 = Math.floor(Math.random() * 20) + 1;
      var dexMod = monster[1].abilities.dex.modifier;
      var initiative = rolld20 + dexMod;
      monsterList[index][1].initiative = initiative;
      monsterList[index][1].participant = 'monster';
      monsterList[index][1].hpList = Array(monster[1].count).fill(monster[1].attributes['hit-points'].total);
    });
    return monsterList;
  }
  getIntiativeRanking(monsterList, playerList) {
    var i;
    for (i = 0; i < playerList.length; i++) {
      playerList[i].participant = 'player';
    }
    var totalList = playerList;
    Object.entries(monsterList).forEach(function(monster) {
      totalList.push(monster[1]);
    });

    totalList.sort(function(a, b) {
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

      rankedList.forEach(function(element, index) {
          if (element.participant === 'player') {
            generatedComponents.push( < Player name = {element.name} ac = {element.ac} key = {index}> < /Player>);
            }
            else
              generatedComponents.push( < Monster monster = {element} updateHp = {updateHp} key = {index} > < /Monster>);
              })

          return (
            <Page
              id='encounter-page'
              title = "Encounter"
              leading={<Link to={'/PlayerSelection'}>Back</Link>}
              trailing={<Link to={'/'}>Next</Link>}>
              <Carousel children = {generatedComponents}></Carousel>
              <DmSidebar rankedList = {rankedList} updateHp = {this.updateHp}></DmSidebar>
          </Page>
          );
        }
      }

      export default EncounterManager;
