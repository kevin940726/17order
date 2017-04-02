const ApiBuilder = require('claudia-api-builder');
const fetch = require('isomorphic-fetch');
const admin = require('firebase-admin');
const credentials = require('./credentials.json');

const api = new ApiBuilder();
const { clientId, clientSecret } = credentials.slack;

admin.initializeApp({
  credential: admin.credential.cert(credentials.firebase),
  databaseURL: 'https://bot-6f5f1.firebaseio.com',
});

api.get('/auth', (request) => {
  const code = request.queryString.code;

  return fetch(`https://slack.com/api/oauth.access?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`)
    .then(res => res.json())
    .then(auth => admin.auth()
      .createCustomToken(auth.user.id)
      .then(customToken => Object.assign({}, auth, { customToken }))
    );
});

module.exports = api;
