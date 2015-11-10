var Promise = require('bluebird');
var db = require('./mongoLabConnection.js')

var events = db.get('eventsBackups');
Promise.promisifyAll(events);

module.exports = {

	get: function(params) {
		params = params || {};
		return events.findAsync(params);
	},

	insert: function(records) {
		return events.insertAsync(records);
	},

	count: function() {
		return events.countAsync({});
	},

	remove: function(params) {
		params = params || {};
		return events.removeAsync(params);
	}

}