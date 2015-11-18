'use strict';

var _cronFbHelper = require('./api/cronFbHelper');

var fbApi = _interopRequireWildcard(_cronFbHelper);

var _locations = require('./db/locations.js');

var locations = _interopRequireWildcard(_locations);

var _events = require('./db/events.js');

var events = _interopRequireWildcard(_events);

var _eventsBackup = require('./db/eventsBackup.js');

var eventsBackup = _interopRequireWildcard(_eventsBackup);

var _locationDetails = require('./db/locationDetails.js');

var locationDetails = _interopRequireWildcard(_locationDetails);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// import * as Promise 'bluebird';

var asyncResults = [];

// back up events
// this logic is not great....if we have more event in the upcoming months backups will work fine, but not if we have less events
// look to do backups in cole storage instead of with collection
asyncResults.push(events.count());
asyncResults.push(eventsBackup.count());
//check to see if there are more events in the
Promise.all(asyncResults).then(function (counts) {
	console.log(counts[0] + ' > ' + counts[1]);
	if (counts[0] > counts[1]) {
		return new Promise(function (resolve, reject) {
			console.log('about to remove backup');
			eventsBackup.remove().then(function () {
				console.log('extracting records for backup');
				return events.get();
			}).then(function (records) {
				console.log('pushing records into backup');
				return eventsBackup.insert(records);
			})
			// .then(function() {
			// 	console.log('clearing way for new events');
			// 	return events.remove();
			// })
			.then(function () {
				resolve();
			}).catch(function (err) {
				reject(err);
			});
		});
	} else {
		return;
	}
	// asyncResults.push(events.remove());
}).then(function () {
	return events.remove();
})
// return Promise.all(asyncResults);
// })
.then(function () {
	console.log('getting list of locations');
	return locations.get();
})

//getting all locations
// locations.get()
// .then(function(data) {
// 	console.log('just for the data from mongo');
// 	// data.forEach(function(location,i) {
//  //  	asyncResults.push(fbApi.getLocationDetails(location.id));
// 	// });

// 	// return Promise.all(asyncResults);
// 	return data;
// })
// //getting location details
// .then(function(locationDetails) {
// 	// return locationDetails.insert(locationDetails);
// 	return locationDetails;
// })
//getting events by location with event details
.then(function (locationDetails) {
	console.log('pulling events for locations');
	asyncResults = [];
	locationDetails.forEach(function (location) {
		if (location.id !== '50112151664') {
			asyncResults.push(fbApi.getEventsByLocation(location.id));
		}
	});

	return Promise.all(asyncResults);
})
//flattening results by location into one array of events
.then(function (eventsResults) {
	var flattened = eventsResults.reduce(function (a, b) {
		return a.concat(b.data);
	}, []);
	// return events.insert(flattened);
	return flattened;
})
//getting attendees for all events, running gender analysis on each, and adding them into events collection
.then(function (eventData) {
	console.log('about to pull all attendees per event');
	asyncResults = [];
	eventData.forEach(function (event) {
		asyncResults.push(new Promise(function (resolve, reject) {

			fbApi.getAttendeesByEvent(event.id).then(function (data) {
				event.demographics = data;
				resolve(event);
			}).catch(function (err) {
				console.error(err);
				reject(err);
			});
		}));
	});
	console.log('done with all attendee');
	return Promise.all(asyncResults);
})
//insert data into mongo events
.then(function (eventList) {
	console.log('inserting events into mongo');
	return events.insert(eventList);
}).then(function () {
	console.log('fin');
}).catch(function (err) {
	console.error(err);
});

// var getLocationDetails = function() {
// 	Promise.all(asyncResults)
// 	.then(function(results){

// 	})
// 	.catch(function(err) {
// 		console.log(err);
// 	});
// }