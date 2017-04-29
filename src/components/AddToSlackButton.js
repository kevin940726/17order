import React from 'react';

const AddToSlackButton = () => (
  <a href="https://slack.com/oauth/authorize?&client_id=3960830011.162372927344&scope=commands,files:write:user,incoming-webhook">
    <img
      alt="Add to Slack"
      height="40"
      width="139"
      src="https://platform.slack-edge.com/img/add_to_slack.png"
      srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
    />
  </a>
);

export default AddToSlackButton;
