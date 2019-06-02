const { WebClient } = require('@slack/web-api');
const web = new WebClient(process.env.SLACK_TOKEN);

module.exports = {
  getUserInfo
}

async function getUserInfo(slackUserId) {
  const userInfo = await web.users.info({ user: slackUserId });
  return userInfo.user;
}