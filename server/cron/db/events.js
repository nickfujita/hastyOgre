var Promise = require('bluebird');
var db = require('./mongoLabConnection.js')

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