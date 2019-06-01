// Load the AWS SDK for Node.js
const { Consumer } = require('sqs-consumer');
var AWS = require('aws-sdk');
// Set the region 
// AWS.config.update({region: 'REGION'});

// Create an SQS service object
const app = Consumer.create({
  queueUrl: process.env.BOT_OUTPUT_QUEUE,
  handleMessage: async (messageJSON) => {
    console.log('11111', messageJSON);
    try {
      const message = JSON.parse(messageJSON.Body);
      console.log(message);
  
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


function reply(message) {
  console.log('zzz');
  const response = {
    trigger_id: message.trigger_id,
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Hi Team! What do you want today?"
        }
      }
    ],
  }
  
  params.MessageDeduplicationId = message.trigger_id,
  params.MessageBody = JSON.stringify(response);

  console.log('eee');

  sqs.sendMessage(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success+", data.MessageId);
    }
  });
}