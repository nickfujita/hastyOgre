var Promise = require('bluebird');
var fb = require('./fbConnection.js');

module.exports = {

	getLocationDetails: function(locationId) {
			console.log('getting location details for: '+locationId);
		return new Promise(function(resolve, reject) {
			fb.api('/'+locationId, function(err,res){
				// console.log(res);
				if(err){
					reject(err);
				} else{
					resolve(res);
				}
			});
		});

		// return fb.apiAsync('/'+locationId);

	},

	getEventsByLocation: function(locationId) {
		
		return fb.apiAsync('/'+locationId+'/events',{ since: Math.floor(Date.now() / 1000), limit: 100, fields: 'id,name,place,start_time,cover,attending_count,maybe_count,declined_count,noreply_count'});
		
	},

	getAttendeesByEvent: function(eventId) {
		
		return fb.apiAsync('/'+eventId+'/attending');

		return new Promise(function(resolve, reject) {

			var allAttending = [];

			var recurse = function() {

				fb.api('/'+locationId, function(err,res){
					// console.log(res);
					if(err){
						reject(err);
					} else{
						resolve(res);
					}
				});
				
				if(res.next) {

				} else {
					resolve(allAttending);
				}

			};


			
		});
		
	}

}
