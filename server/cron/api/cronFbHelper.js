var Promise = require('bluebird');
var fb = require('./fbConnection.js');
var gender = require('gender')

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

		return new Promise(function(resolve, reject) {

			var allAttending = {
				eventId: eventId,
				attendees: []
			};

			var recurse = function(url) {

				url = url || ('/'+eventId+'/attending')

				fb.api(url, function(err,res){
					
					if(err){
						reject(err);
					} else{
						// console.log(res);
						if(res.paging && res.paging.next) {
							// console.log('allAttending.attendees');
							// console.log(allAttending.attendees);
							// console.log('res.data');
							// console.log(res.data);

							res.data.forEach(function(person) {
								person.gender = gender.guess(person.name)
								allAttending.attendees.push(person);
							})

							recurse(res.paging.next);
						} else {
							res.data.forEach(function(person) {
								person.gender = gender.guess(person.name)
								allAttending.attendees.push(person);
							})
							resolve(allAttending);
						}
					}
				});
			};

			recurse();

		});
	}
};
