var db = require('./mongoLabConnection.js')

var eventDetails = db.get('eventDetails');

module.exports = {

	get: function(params) {
		params = params || {};
		return eventDetails.findAsync(params);
	},

	insert: function(records) {
		return eventDetails.insert(records);
	}

}