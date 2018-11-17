import ShortId from 'shortid';

const storage = {
  // TODO: Finish Cache implementation
  _dirty: {parties: true, encounters: true},
  _cache: {parties: {}, encounters: {}},
  getPartiesFromStorage(asArray = false) {
    let result; 
    if (this._dirty.parties) {
      let str = localStorage.getItem('savedParties');
      if (str) {
        result = JSON.parse(str);
      } else {
        result =  {};
      }
    this._cache.parties = result;
    this._dirty.parties = false;
    } else {
      result = this._cache.parties;
    }
    return asArray ? Object.values(result) : result;
  },

  getEncountersFromStorage(asArray = false) {
    let result;
    if (this._dirty.encounters) {
      let str = localStorage.getItem('savedEncounters');
      if (str) {
        result = JSON.parse(str);
      } else {
        result = {};
      }
      this._cache.encounters = result;
      this._dirty.encounters = false;
    } else {
      result = this._cache.encounters;
      console.log('CACHED ENCOUNTERS')
    }
    return asArray ? Object.values(result) : result;
  },

  getPartyFromStorage(partyUid) {
    if (partyUid) {
      return this.getPartiesFromStorage()[partyUid];
    } else {
      return null;
    }
  },

  getEncounterFromStorage(encounterUid) {
    if (encounterUid) {
      return this.getEncountersFromStorage()[encounterUid];
    } else {
      return null;
    }
  },

  savePartyToStorage(party) {
    party.uid = party.uid || ShortId.generate();
    party.title = party.title || "New Party";

    let str = localStorage.getItem('savedParties');
    let _new;
    if (str) {
      _new = {...JSON.parse(str), [party.uid] : party,};
    } else {
      _new = {[party.uid] : party};
    }

    localStorage.setItem('savedParties', JSON.stringify(_new));
    this._dirty.parties = true;
    return _new[party.uid];
  },

  saveEncounterToStorage(encounter) {
    encounter.uid   = encounter.uid || ShortId.generate();
    encounter.title = encounter.title || "New Encounter";

    let str = localStorage.getItem('savedEncounters');
    let _new;
    if (str) {
      _new = {...JSON.parse(str), [encounter.uid] : encounter, };
    } else {
      _new = {[encounter.uid] : encounter};
    }

    localStorage.setItem('savedEncounters', JSON.stringify(_new));
    this._dirty.encounters = true;
    return _new[encounter.uid];
  },

  removePartyFromStorage(party) {
    let str = localStorage.getItem('savedParties');
    if (str) {
      let obj = JSON.parse(str);
      
      if (party.uid in obj) {
        delete obj[party.uid];
        localStorage.setItem('savedParties', JSON.stringify(obj));
        this._dirty.parties = true;
        return true;
      }
    }
    return false;
  },

  removeEncounterFromStorage(encounter) {
    let str = localStorage.getItem('savedEncounters');
    if (str) {
      let obj = JSON.parse(str);

      if (encounter.uid in obj) {
        delete obj[encounter.uid];
        localStorage.setItem('savedEncounters', JSON.stringify(obj));
        this._dirty.encounters = true;
        return true;
      }
    }
    return false;
  }
}

const constants = {
  EncounterStage: {
    CREATED: 0,
    MONSTERS_SELECTED: 1,
    PLAYERS_SELECTED: 2,
    RUNNING: 3,
    COMPLETED: 4,
  }
}

export { storage, constants };