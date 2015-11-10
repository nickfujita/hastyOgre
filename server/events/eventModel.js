var Promise = require('bluebird');
var db = require('monk')('mongodb://ogre:m0n3yl0v333@ds043694.mongolab.com:43694/hastyogre');

var events = db.get('events');

Promise.promisifyAll(events);

module.exports = {

	get: function(params) {
		params = params || {};
		return events.findAsync(params);
	},

	insert: function(records) {
		return events.insertAsync(records);
	}

}