module.exports = {
  getStacks,
  getStackDomainOptions,
}

const AWS = require('aws-sdk');

const post = require('./post');

let stacksList = [];

var CronJob = require('cron').CronJob;
const job = new CronJob('0 */5 * * * *', () => {
  console.log('You will see this message every 5 minutes', Date.now());
  run();
});

job.start();

// post({
//   channel: <channelId>,
//   text: 'I feel fine',
// })

function getStacks() {
  return stacksList;
}

function getStackDomainOptions(prefix = 'CM.SelectCluster') {
  return stacksList.map(stack => ({"text": {"type": "plain_text","text": `${stack.domain}`},"value": `[${prefix}]${stack.domain}`}));
}

function getCloudlinkIPs(domain) {
  const targetStack = stacksList.find(entry => entry.domain === domain);
  cloudformation.describeStackResource({StackName: targetStack.name, LogicalResourceId: 'UplinkInstanceGroup'}, (err, data) => {
    if (err) {
      console.error('ERROR:', err);
      throw(err);
    }  


    // const uplinkGroup = data.filter(entry => entry.LogicalResourceId === 'UplinkInstanceGroup');
    // cloudformation.describeStackResource
    /**
    { 
      ResponseMetadata: { RequestId: '3acf6991-817c-11e9-be6e-43f491be5cda' },
      StackResourceDetail: 
      { StackName: 'VOSaaS-Cluster-Replicants-Inc-e187b9e7-e464-5d40-99bd-144268c5db24',
        StackId: 'arn:aws:cloudformation:us-west-2:421572644019:stack/VOSaaS-Cluster-Replicants-Inc-e187b9e7-e464-5d40-99bd-144268c5db24/3239eba0-810f-11e9-918e-02035744c0fa',
        LogicalResourceId: 'UplinkInstanceGroup',
        PhysicalResourceId: 'VOSaaS-Cluster-Replicants-Inc-e187b9e7-e464-5d40-99bd-144268c5db24-UplinkInstanceGroup-1MTVSHEU3VUEE',
        ResourceType: 'AWS::AutoScaling::AutoScalingGroup',
        LastUpdatedTimestamp: 2019-05-28T06:11:06.094Z,
        ResourceStatus: 'CREATE_COMPLETE',
        Metadata: '{}',
        DriftInformation: { StackResourceDriftStatus: 'NOT_CHECKED' } } }
     */
    // console.log('DATA:', data);

    const autoscaling = new AWS.AutoScaling({apiVersion: '2011-01-01'});
    const params = {
      AutoScalingGroupNames: [
        data.StackResourceDetail.PhysicalResourceId,
        /* more items */
      ],
      // MaxRecords: 'NUMBER_VALUE',
      // NextToken: 'STRING_VALUE'
    };
    autoscaling.describeAutoScalingGroups(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        throw(err);
      }

      const InstanceIds = data.AutoScalingGroups[0].Instances.map(instance => instance.InstanceId);  

      const ec2 = new AWS.EC2();

      const ec2Params = {
        InstanceIds
       };

      ec2.describeInstances(ec2Params, function(err, data) {
        if (err) {
          console.log(err, err.stack); // an error occurred
          throw(err);
        }
        
        // TODO: could it be over multiple reservations?
        console.log('Cloudlink IPs:', data.Reservations[0].Instances.map(i => i.PublicIpAddress));           // successful response
      });
    });
  })



  console.log('****', targetStack);
}

var cloudformation = new AWS.CloudFormation();

async function run() {
  await cloudformation.describeStacks({}, (err, data) => {
    if (err) {
      logError(err);
      return;
    }
  
    const formattedStacks = formatStacks(data.Stacks);
    const publicStacks = publicOnly(formattedStacks);
  
    stacksList = publicStacks;
    // console.log("StackList:", stacksList.map(stack => `{"text": {"type": "plain_text","text": "${stack.domain}"},"value": "[clusterManagement]selectTeamCluster:${stack.domain}"},`)); //stack.domain));

    // ^--- non-async; use cached anyway

    // TODO: Uplinks IP Getter
    // getCloudlinkIPs('replicantsinc-01.nebula.video');

    // TODO: DANGER ZONE
    return;
    // stack deletion
    const targetStack = stacksList.find(entry => entry.domain === domain);
    const deleteStackParams = {
      StackName: targetStack.name,
    }
    cloudformation.deleteStack(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
  });
  
}

run();

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