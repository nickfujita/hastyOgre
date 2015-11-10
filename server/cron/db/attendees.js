var db = require('./mongoLabConnection.js')

var attendees = db.get('attendees');

module.exports = {

	get: function(params) {
		params = params || {};
		return attendees.find(params);
	},

	insert: function(records) {
		return attendees.insert(records);
	}


}