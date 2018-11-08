import React, {Component} from 'react';
import Player from './Player.jsx';
import Monster from './Monsters.jsx';
import Carousel from './Carousel.jsx';
import '../styles/EncounterManager.scss';

class EncounterManager extends Component {
  generateMonsterInitiatives(monsterList) {
    Object.entries(monsterList).forEach(function(monster, index, monsterList) {
      var rolld20 = Math.floor(Math.random() * 20) + 1;
      var dex = monster[1].details.dexterity;
      var initiative = rolld20 + Math.floor((dex - 10) / 2);
      monsterList[index][1].initiative = initiative;
      monsterList[index][1].type = 'monster';
    });
    return monsterList;
  }
  getIntiativeRanking(monsterList, playerList) {
    var i;
    for (i = 0; i < playerList.length; i++) {
      playerList[i].type = 'player';
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
      var playerList = [{
        name: "Kaitlin",
        ac: '18',
        initiative: '22'
      }, {
        name: 'Janik',
        ac: '19',
        initiative: '13'
      }] //this.props.playerList;
      var monsterList = {
        1: {
          count: 3,
          name: "Aboleth",
          details: {
            "_id": "5bce91465b7768e7920181a5",
            "index": 1,
            "name": "Aboleth",
            "size": "Large",
            "type": "aberration",
            "subtype": "",
            "alignment": "lawful evil",
            "armor_class": 17,
            "hit_points": 135,
            "hit_dice": "18d10",
            "speed": "10 ft., swim 40 ft.",
            "strength": 21,
            "dexterity": 9,
            "constitution": 15,
            "intelligence": 18,
            "wisdom": 15,
            "charisma": 18,
            "constitution_save": 6,
            "intelligence_save": 8,
            "wisdom_save": 6,
            "history": 12,
            "perception": 10,
            "damage_vulnerabilities": "",
            "damage_resistances": "",
            "damage_immunities": "",
            "condition_immunities": "",
            "senses": "darkvision 120 ft., passive Perception 20",
            "languages": "Deep Speech, telepathy 120 ft.",
            "challenge_rating": 10,
            "special_abilities": [{
                "attack_bonus": 0,
                "desc": "The aboleth can breathe air and water.",
                "name": "Amphibious"
              },
              {
                "attack_bonus": 0,
                "desc": "While underwater, the aboleth is surrounded by transformative mucus. A creature that touches the aboleth or that hits it with a melee attack while within 5 ft. of it must make a DC 14 Constitution saving throw. On a failure, the creature is diseased for 1d4 hours. The diseased creature can breathe only underwater.",
                "name": "Mucous Cloud"
              },
              {
                "attack_bonus": 0,
                "desc": "If a creature communicates telepathically with the aboleth, the aboleth learns the creature's greatest desires if the aboleth can see the creature.",
                "name": "Probing Telepathy"
              }
            ],
            "actions": [{
                "attack_bonus": 0,
                "desc": "The aboleth makes three tentacle attacks.",
                "name": "Multiattack"
              },
              {
                "damage_bonus": 5,
                "damage_dice": "2d6",
                "attack_bonus": 9,
                "desc": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 12 (2d6 + 5) bludgeoning damage. If the target is a creature, it must succeed on a DC 14 Constitution saving throw or become diseased. The disease has no effect for 1 minute and can be removed by any magic that cures disease. After 1 minute, the diseased creature's skin becomes translucent and slimy, the creature can't regain hit points unless it is underwater, and the disease can be removed only by heal or another disease-curing spell of 6th level or higher. When the creature is outside a body of water, it takes 6 (1d12) acid damage every 10 minutes unless moisture is applied to the skin before 10 minutes have passed.",
                "name": "Tentacle"
              },
              {
                "damage_bonus": 5,
                "damage_dice": "3d6",
                "attack_bonus": 9,
                "desc": "Melee Weapon Attack: +9 to hit, reach 10 ft. one target. Hit: 15 (3d6 + 5) bludgeoning damage.",
                "name": "Tail"
              },
              {
                "attack_bonus": 0,
                "desc": "The aboleth targets one creature it can see within 30 ft. of it. The target must succeed on a DC 14 Wisdom saving throw or be magically charmed by the aboleth until the aboleth dies or until it is on a different plane of existence from the target. The charmed target is under the aboleth's control and can't take reactions, and the aboleth and the target can communicate telepathically with each other over any distance.\nWhenever the charmed target takes damage, the target can repeat the saving throw. On a success, the effect ends. No more than once every 24 hours, the target can also repeat the saving throw when it is at least 1 mile away from the aboleth.",
                "name": "Enslave (3/day)"
              }
            ],
            "legendary_actions": [{
                "attack_bonus": 0,
                "desc": "The aboleth makes a Wisdom (Perception) check.",
                "name": "Detect"
              },
              {
                "attack_bonus": 0,
                "desc": "The aboleth makes one tail attack.",
                "name": "Tail Swipe"
              },
              {
                "attack_bonus": 0,
                "desc": "One creature charmed by the aboleth takes 10 (3d6) psychic damage, and the aboleth regains hit points equal to the damage the creature takes.",
                "name": "Psychic Drain (Costs 2 Actions)"
              }
            ],
            "url": "http://www.dnd5eapi.co/api/monsters/1"
          },
          url: "http://www.dnd5eapi.co/api/monsters/1"
        },
        2: {
          count: 1,
          name: "Acolyte",
          details: {
            "_id": "5bce91465b7768e7920181a3",
            "index": 2,
            "name": "Acolyte",
            "size": "Medium",
            "type": "humanoid",
            "subtype": "any race",
            "alignment": "any alignment",
            "armor_class": 10,
            "hit_points": 9,
            "hit_dice": "2d8",
            "speed": "30 ft.",
            "strength": 10,
            "dexterity": 10,
            "constitution": 10,
            "intelligence": 10,
            "wisdom": 14,
            "charisma": 11,
            "medicine": 4,
            "religion": 2,
            "damage_vulnerabilities": "",
            "damage_resistances": "",
            "damage_immunities": "",
            "condition_immunities": "",
            "senses": "passive Perception 12",
            "languages": "any one language (usually Common)",
            "challenge_rating": 0.25,
            "special_abilities": [{
              "attack_bonus": 0,
              "desc": "The acolyte is a 1st-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 12, +4 to hit with spell attacks). The acolyte has following cleric spells prepared:\n\n• Cantrips (at will): light, sacred flame, thaumaturgy\n• 1st level (3 slots): bless, cure wounds, sanctuary",
              "name": "Spellcasting"
            }],
            "actions": [{
              "damage_dice": "1d4",
              "attack_bonus": 2,
              "desc": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage.",
              "name": "Club"
            }],
            "url": "http://www.dnd5eapi.co/api/monsters/2"
          },
          url: "http://www.dnd5eapi.co/api/monsters/2"
        }

      } //this.props.monsterList;

      monsterList = this.generateMonsterInitiatives(monsterList);
      var rankedList = this.getIntiativeRanking(monsterList, playerList);

      var generatedComponents = [];

      rankedList.forEach(function(element, index) {
          if (element.type === 'player') {
            generatedComponents.push( < Player name = {element.name} ac = {element.ac} key = {index}> < /Player>);
            }
            else
              generatedComponents.push( < Monster monster = {element} key = {index} > < /Monster>);
              })

          return (
            <div className = 'encounter-container' >
            <Carousel children = {generatedComponents}></Carousel>
            </div>
          );
        }
      }

      export default EncounterManager;
