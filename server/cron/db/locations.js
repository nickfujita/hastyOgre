var Promise = require('bluebird');
var db = require('./mongoLabConnection.js')

var locations = db.get('locations');
Promise.promisifyAll(locations);

module.exports = {

	get: function(params) {
		params = params || {};
		return locations.findAsync(params);
	},

	insert: function(records) {
		return locations.insert(records);
	}

}