import axios from 'axios';

import {Config} from '../Config';

/**
 * Class to hold all species groups ... singleton class
 * TODO: cache loaded values
 */
class SpeciesGroup {

    constructor() {
    }


    fetch(callback) {
        const url = `${Config.api.API_ROOT_URL}/species/list`;
        if(callback) {
            axios.get(url).then(response => {
                callback(response.data);
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
