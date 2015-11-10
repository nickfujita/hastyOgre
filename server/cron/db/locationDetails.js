var db = require('./mongoLabConnection.js')
var Promise = require('bluebird');

var locationDetails = db.get('locationDetails');
Promise.promisifyAll(locationDetails);


module.exports = {

	get: function(params) {
		params = params || {};
		return locationDetails.findAsync(params);
	},

	insert: function(records) {
		return locationDetails.insertAsync(records);
	}

}