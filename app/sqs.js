// Load the AWS SDK for Node.js
const { Consumer } = require('sqs-consumer');
const AWS = require('aws-sdk');
const clusterManagerPayloadHandler = require('./cluster-manager');
// Set the region 
// AWS.config.update({region: 'REGION'});

// Create an SQS service object
const app = Consumer.create({
  queueUrl: process.env.BOT_OUTPUT_QUEUE,
  handleMessage: async (messageJSON) => {
    try {
      const message = JSON.parse(messageJSON.Body);
  
      reply(message);
    } catch(e) {
      console.log('WHOOPS >>>', e)
    }
    
    // Skip message removal
    // throw('NotMyMessage');
  }
});

app.on('error', (err) => {
  console.error(err.message);
});

app.on('processing_error', (err) => {
  console.error(err.message);
});

app.start();

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var params = {
  // DelaySeconds: 10,
  // MessageAttributes: {
  //   "Title": {
  //     DataType: "String",
  //     StringValue: "The Whistler"
  //   },
  //   "Author": {
  //     DataType: "String",
  //     StringValue: "John Grisham"
  //   },
  //   "WeeksOn": {
  //     DataType: "Number",
  //     StringValue: "6"
  //   }
  // },
  MessageGroupId: 'default',
  MessageDeduplicationId: '1',
  MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
  QueueUrl: process.env.BOT_INPUT_QUEUE,
};

// sqs.sendMessage(params, function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data.MessageId);
//   }
// });


async function reply(message) {
  console.log(message);
  const response = {
    trigger_id: message.trigger_id,
    // message.user.id - uid for TZ
    // message.channel.id - for notifications
    blocks: await clusterManagerPayloadHandler(message),
  }
  
  params.MessageDeduplicationId = Date.now().toString() + message.trigger_id,
  params.MessageBody = JSON.stringify(response);
console.log('**&&', params);
  sqs.sendMessage(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success+", data.MessageId);
    }
  });
}