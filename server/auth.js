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
    .then(auth => {
      // add to slack
      if (auth && auth.ok === true && auth.incoming_webhook) {
        return admin.database()
          .ref(auth.team_id)
          .child('webhook')
          .set(auth.incoming_webhook)
          .then(() => auth);
      }

      // sign in with slack
      return admin.database()
        .ref(auth.team.id)
        .child('webhook')
        .once('value')
        .then(snapshot => admin.auth()
          .createCustomToken(auth.user.id, {
            teamId: auth.team.id,
          })
          .then(customToken => Object.assign({}, auth, {
            customToken,
            webhook: snapshot.val(),
          }))
        );
    });
});

module.exports = api;
