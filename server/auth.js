const ApiBuilder = require('claudia-api-builder');
const fetch = require('isomorphic-fetch');
const admin = require('firebase-admin');

const api = new ApiBuilder();
const {
  FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_DATABASE_URL,
  SLACK_CLIENT_ID,
  SLACK_CLIENT_SECRET,
} = process.env;

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: FIREBASE_PROJECT_ID,
    privateKey: FIREBASE_PRIVATE_KEY,
    clientEmail: FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: FIREBASE_DATABASE_URL,
});

const authHandler = api.get('/auth', (request) => {
  const { code, redirectUri } = request.queryString;

  if (!code) {
    return Promise.reject('No code specified'); // stop poking my server!
  }

  return fetch(`https://slack.com/api/oauth.access?client_id=${SLACK_CLIENT_ID}&client_secret=${SLACK_CLIENT_SECRET}&code=${code}&redirect_uri=${redirectUri}`)
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
