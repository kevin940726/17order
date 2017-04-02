import React from 'react';

const SignInButton = () => (
  <a href="https://slack.com/oauth/authorize?scope=identity.basic,identity.team,identity.avatar&client_id=3960830011.162372927344">
    <img
      alt="Sign in with Slack"
      height="40"
      width="172"
      src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
      srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
    />
  </a>
);

export default SignInButton;
