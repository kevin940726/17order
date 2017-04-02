const ApiBuilder = require('claudia-api-builder');
const fetch = require('isomorphic-fetch');
const credentials = require('./credentials.json');

const api = new ApiBuilder();
const { clientId, clientSecret } = credentials.slack;

api.get('/auth', request => {
  const code = request.queryString.code;

  return fetch(`https://slack.com/api/oauth.access?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`)
    .then(res => res.json());
});

module.exports = api;
