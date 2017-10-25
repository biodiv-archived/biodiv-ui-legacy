import axios from 'axios';

import {ROOT_URL} from '../Config';

/**
 * Class to hold all species groups ... singleton class
 * TODO: cache loaded values
 */
class SpeciesGroup {

    constructor() {
    }


    fetch(callback) {
        const url = `${ROOT_URL}/api/speciesGroup/list?format=json`;
        if(callback) {
            axios.get(url).then(response => {
                callback(response.data.model.instanceList);
            });
        } else
            return axios.get(url).then(response => response.data.model.instanceList);
    }

    list(callback) {
        if(this.values) {
            if(callback) return callback(this.values);
            else return this.values;
        } else return this.fetch(callback);
    }
}

export default new SpeciesGroup();
