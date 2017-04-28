const ApiBuilder = require('claudia-api-builder');
const fetch = require('isomorphic-fetch');
const admin = require('firebase-admin');

const api = new ApiBuilder();
const {
  FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_DATABASE_URL,
  SLACK_CLIENT_ID,
  SLACK_CLIENT_SECRET,
} = process.env;

admin.initializeApp({
  credential: admin.credential.cert({
    private_key: FIREBASE_PRIVATE_KEY,
    client_email: FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: FIREBASE_DATABASE_URL,
});

const promisifyHandler = handler => (request, response, next) => {
  handler(request)
    .then(response.json)
    .catch(err => {
      console.error(err);
      next(err);
    });
};

const authHandler = (request) => {
  const { code } = request.query;

  if (!code) {
    return Promise.reject('No code specified'); // stop poking my server!
  }

  return fetch(`https://slack.com/api/oauth.access?client_id=${SLACK_CLIENT_ID}&client_secret=${SLACK_CLIENT_SECRET}&code=${code}`)
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
};

module.exports = promisifyHandler(authHandler);
