import React from 'react';

const AddToSlackButton = () => (
  <a href="https://slack.com/oauth/authorize?scope=incoming-webhook&client_id=3960830011.162372927344">
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
