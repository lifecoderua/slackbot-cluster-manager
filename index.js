require('dotenv').config();
var AWS = require('aws-sdk');

// may be updated on the fly
const region = 'us-west-2';
AWS.config.update({region});

var cloudformation = new AWS.CloudFormation();


const util = require('util')
cloudformation.describeStacks({}, (err, data) => {
  logError(err);

  console.log(util.inspect(data, false, 4, false /* enable colors */));
})

function logError(err) {
  if (!err) { return; }

  console.error(err);
}

/* Targetable attributes:
StackId
StackName
CreationTime: 2019-05-16T09:57:22.592Z,
StackStatus
Outputs: [{ OutputKey: ['DNSName',
            OutputValue: ['<team-domain>.<goes>.<here>',
            Description: ['... DNS Name' } ],

*/
