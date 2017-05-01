import Dropbox from 'dropbox';
import env from '../.env.json';
const DROPBOX_ACCESS_TOKEN = 'DROPBOX_ACCESS_TOKEN';

let client = null;
let _token = null;

export function createClient(token = _token) {
  client = new Dropbox({ accessToken: token });
}

export function getAuthUrl(path = '') {
  client = new Dropbox({ clientId: env.CLIENT_ID });
  return client.getAuthenticationUrl(`${window.location.origin}${path}`);
}

export function login() {
  return new Promise((resolve, reject) => {
    const token = getAccessTokenFromUrl() || getAccessTokenFromSessionStorage();
    if (token) {
      createClient(token);
      return client.usersGetCurrentAccount().then(resolve);
    } else {
      reject();
    }
  }).catch(e => console.log(e));
}

export function logout() {
  if (!localStorage) {
    return;
  }
  return localStorage.removeItem(DROPBOX_ACCESS_TOKEN);
}

export function getAccessTokenFromSessionStorage() {
  if (!localStorage) {
    return null;
  }
  const token = localStorage.getItem(DROPBOX_ACCESS_TOKEN);
  return token;
}

export function storeSessionToken(token) {
  createClient(token);
  if (!localStorage) {
    return;
  }
  return localStorage.setItem(DROPBOX_ACCESS_TOKEN, token);
}

export function getAccessTokenFromUrl() {
  if (!window.location.hash.length) {
    return undefined;
  }
  const token = parseQueryString(window.location.hash).access_token;
  storeSessionToken(token);
  return token;
}

export function parseQueryString(str) {
      var ret = Object.create(null);

      if (typeof str !== 'string') {
        return ret;
      }

      str = str.trim().replace(/^(\?|#|&)/, '');

      if (!str) {
        return ret;
      }

      str.split('&').forEach(function (param) {
        var parts = param.replace(/\+/g, ' ').split('=');
        // Firefox (pre 40) decodes `%3D` to `=`
        // https://github.com/sindresorhus/query-string/pull/37
        var key = parts.shift();
        var val = parts.length > 0 ? parts.join('=') : undefined;

        key = decodeURIComponent(key);

        // missing `=` should be `null`:
        // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
        val = val === undefined ? null : decodeURIComponent(val);

        if (ret[key] === undefined) {
          ret[key] = val;
        } else if (Array.isArray(ret[key])) {
          ret[key].push(val);
        } else {
          ret[key] = [ret[key], val];
        }
      });

      return ret;
    }