require('dotenv').config();
var AWS = require('aws-sdk');

// may be updated on the fly
const region = 'us-west-2';
AWS.config.update({region});


// require('./app/stacks');

// return;

require('./app/store');

require('./app/sqs');

require('./app/config');


