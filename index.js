require('dotenv').config();
var AWS = require('aws-sdk');

// may be updated on the fly
const region = 'us-west-2';
AWS.config.update({region});


require('./app/sqs');

var cloudformation = new AWS.CloudFormation();


const util = require('util')
cloudformation.describeStacks({}, (err, data) => {
  if (err) {
    logError(err);
    return;
  }

  const formattedStacks = formatStacks(data.Stacks);
  const publicStacks = publicOnly(formattedStacks);
  console.log(util.inspect(publicStacks, false, 4, false /* enable colors */));
  // console.log(util.inspect(data, false, 4, false /* enable colors */));
})

function logError(err) {
  if (!err) { return; }

  console.error(err);
}

function formatStacks(stacks) {
  return stacks.map((stack) => {
    return {
      id: stack.StackId,
      name: stack.StackName,
      status: stack.StackStatus,
      creationTime: stack.CreationTime,
      domain: findDomain(stack),
    }
  });
}

function findDomain(stack) {
  const dnsEntry = stack.Outputs.find((output, index, arr) => {
    return output.OutputKey === 'DNSName'
  });

  if (!dnsEntry) {
    return '';
  }

  return dnsEntry.OutputValue;
}

function publicOnly(stacks) {
  return stacks.filter(stack => stack.domain.length > 0)
}

/* Targetable attributes:
StackId
StackName
CreationTime: 2019-05-16T09:57:22.592Z,
StackStatus: 'CREATE_COMPLETE' | 'UPDATE_COMPLETE'
Outputs: [{ OutputKey: 'DNSName',
            OutputValue: '<team-domain>.<goes>.<here>',
            Description: '... DNS Name' } ],

_____            
Template | Account, (?) Created By - provided by microsite
*/
