const AWS = require('aws-sdk');

// TODO: STOP HERE
return;

// Create the DynamoDB service object
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const params = {
  TableName: 'vosbot',
  Item: {
    'appId' : {S: 'cluterManager'},
    'CUSTOMER_NAME' : {S: 'Richard 2 Roe'}
  }
};

// Call DynamoDB to add the item to the table
ddb.putItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});


// const params = {
//   TableName: 'vosbot',
//   Key: {
//     'appId': { S: 'clusterManager' },
//   },
// };

// ddb.getItem(params, function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data.Item);
//   }
// });


// const params = {
//   TableName: 'vosbot',
//   ExpressionAttributeNames: {
//     "#Y": "Config"
//    }, 
//    ExpressionAttributeValues: {
//     ":y": {
//       S: "ARRRGH!"
//      }
//    }, 
//    Key: {
//     "appId": {
//       S: "clusterManager"
//      },
//    }, 
//    ReturnValues: "ALL_NEW", 
//    UpdateExpression: "SET #Y = :y"
// };

// ddb.updateItem(params, function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data.Item);
//   }
// });