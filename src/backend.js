import feathers from 'feathers-client';
import fetch from 'node-fetch';
import { API_URL } from './config';

let instance = null;

class Backend {
  constructor() {
    if (!instance) {
      instance = this;

      this.app = feathers()
        .configure(feathers.rest(API_URL).fetch(fetch))
        .configure(feathers.hooks())
        .configure(feathers.authentication({
          storage: window.localStorage
        }));

    } else {
      return instance;
    }
  }
}

export default (new Backend());
