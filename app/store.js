module.exports = {};

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION
};

db = require('dynasty')(credentials);
data = db.table('vosbot-cluster-management');

data.scan().then(teams => console.log(teams));

class StoreManager {
  constructor() {
    // this.
    // normalize structure if needed - though should be normal by default
    // convert into inner data: time-team pairs, etc.
  }
}

return;

data.find('#ID_TEST').then(team => console.log(team)); // appId / primary key

data.update('#TOSTR_2',{
  clusterDns: '*notreal*.nebula.video',
  checkTime: '5pm',
  // custom/snooze field: nextCheckPlanned
}).then(res => console.log(res));