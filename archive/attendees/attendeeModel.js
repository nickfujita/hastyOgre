var Promise = require('bluebird');
var db = require('monk')('mongodb://ogre:m0n3yl0v333@ds043694.mongolab.com:43694/hastyogre');

var attendees = db.get('attendees');

Promise.promisifyAll(attendees);

module.exports = {

	get: function() {
		return attendees.findAsync({},{fields: {eventId:1,genderSummary:1}});
	},

	insert: function(records) {
		return attendees.insertAsync(records);
	}

}