module.exports = {
  get,
  update
};

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION
};

db = require('dynasty')(credentials);
data = db.table('vosbot-cluster-management');

let teams = [];

data.scan().then(teamsData => teams = teamsData);

class StoreManager {
  constructor() {
    // this.
    // normalize structure if needed - though should be normal by default
    // convert into inner data: time-team pairs, etc.
  }
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function get(teamId) {
  data.scan().then(teamsData => teams = teamsData);
  return clone(teams[teamId]);
}

function update(teamId, payload) {
  // console.log('!!!!:::::!!!!', payload);
  data.update(teamId, payload)
    .then(res => console.log(res))
    .catch(err => console.error('UPDATE ERROR', err))
}

return;

data.find('#ID_TEST').then(team => console.log(team)); // appId / primary key

data.update('#TOSTR_2',{
  clusterDns: '*notreal*.nebula.video',
  checkTime: '5pm',
  // custom/snooze field: nextCheckPlanned
}).then(res => console.log(res));