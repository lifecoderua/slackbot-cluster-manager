module.exports = getStacks;

const AWS = require('aws-sdk');

let stacksList = [];

var CronJob = require('cron').CronJob;
const job = new CronJob('0 */5 * * * *', () => {
  console.log('You will see this message every minute', Date.now());
});

job.start();

function getStacks() {
  return stacksList;
}


var cloudformation = new AWS.CloudFormation();


cloudformation.describeStacks({}, (err, data) => {
  if (err) {
    logError(err);
    return;
  }

  const formattedStacks = formatStacks(data.Stacks);
  const publicStacks = publicOnly(formattedStacks);

  stacksList = publicStacks;
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