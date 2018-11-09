import ShortId from 'shortid';

const utils = {
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

    let str = localStorage.getItem('savedParties');
    let _new;
    if (str) {
      _new = {...JSON.parse(str), [party.uid] : party,};
    } else {
      _new = {[party.uid] : party};
    }

    localStorage.setItem('savedParties', JSON.stringify(_new));
  },

  saveEncounterToStorage(encounter) {
    encounter.uid = encounter.uid || ShortId.generate();

    let str = localStorage.getItem('savedEncounters');
    let _new;
    if (str) {
      _new = {...JSON.parse(str), [encounter.uid] : encounter, };
    } else {
      _new = {[encounter.uid] : encounter};
    }

    localStorage.setItem('savedEncounters', JSON.stringify(_new));
  },
}

export default utils;