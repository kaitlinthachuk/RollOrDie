import ShortId from 'shortid';

const storage = {
  // TODO: Finish Cache implementation
  // _dirtyFlags: {parties: true, encounters: true},
  // _cache: {parties: null, encounters: null},
  getPartiesFromStorage(asArray = false) {
    let str = localStorage.getItem('savedParties');
    if (str) {
      return asArray ? Object.values(JSON.parse(str)) : JSON.parse(str);
    } else {
      return asArray ? [] : {};
    }
  },

  getEncountersFromStorage(asArray = false) {
    let str = localStorage.getItem('savedEncounters');
    if (str) {
      return asArray ? Object.values(JSON.parse(str)) : JSON.parse(str);
    } else {
      return asArray ? [] : {};
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
    return _new[encounter.uid];
  },

  removePartyFromStorage(party) {
    let str = localStorage.getItem('savedParties');
    if (str) {
      let obj = JSON.parse(str);
      
      if (party.uid in obj) {
        delete obj[party.uid];
        localStorage.setItem('savedParties', JSON.stringify(obj));
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