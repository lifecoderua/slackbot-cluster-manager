module.exports = post;

const AWS = require('aws-sdk');
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

// {channel: channelId, text:, blocks,}
function post(payload) {
  const message = {
    type: 'post',
    payload,
  }

  const params = {
    MessageGroupId: 'default',
    MessageDeduplicationId: Date.now().toString() + Math.random().toString(),
    MessageBody: JSON.stringify(message),
    QueueUrl: process.env.BOT_INPUT_QUEUE,
  };

  sqs.sendMessage(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success+", data.MessageId);
    }
  });
  console.log('POST')
}
