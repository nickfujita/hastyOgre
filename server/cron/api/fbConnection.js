var Facebook = require('facebook-node-sdk');
var Promise = require('bluebird');

var facebook = new Facebook({ appId: '679341005545375', secret: 'bf83face4c5d77a2a4dfe9e2bc4555e9' });

Promise.promisifyAll(facebook);

module.exports = facebook;