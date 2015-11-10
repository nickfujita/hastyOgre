var fbApi = require('./api/cronFbHelper');
var locations = require('./db/locations.js');
var events = require('./db/events.js');
var attendees = require('./db/attendees.js');
var locationDetails = require('./db/locationDetails.js');
var Promise = require('bluebird');
var asyncResults = [];

locations.get()
//getting all locations
.then(function(data) {
	console.log('just for the data from mongo');
	data.forEach(function(location,i) {
  	asyncResults.push(fbApi.getLocationDetails(location.id));
	});

	return Promise.all(asyncResults);
})
//getting location details
.then(function(locationDetails) {
	// return locationDetails.insert(locationDetails);
	return locationDetails;
})
//getting events by location with event details
.then(function(locationDetails) {
	asyncResults = [];
	locationDetails.forEach(function(location) {
  	asyncResults.push(fbApi.getEventsByLocation(location.id));
	});

	return Promise.all(asyncResults);
})
//flattening results by location into one array of events
.then(function(eventsResults) {
	var flattened = eventsResults.reduce(function(a, b) {
	  return a.concat(b.data);
	}, []);
	// return events.insert(flattened);
	return flattened;
})
//getting attendees for all events, running gender analysis on each, and adding them into events collection
.then(function(eventData) {
	asyncResults = [];
	eventData.forEach(function(event) {
  	asyncResults.push(new Promise(function(resolve, reject) {

  		fbApi.getAttendeesByEvent(event.id)
  		.then(function(data) {
  			event.demographics = data;
  			resolve(event);
  		})
  		.catch(function(err) {
  			console.error(err);
  			reject(err);
  		});

  	}));
	});
	console.log('done with all attendee')
	return Promise.all(asyncResults);
})
//insert data into mongo events
.then(function(eventList) {
	console.log('inserting events into mongo')
	return events.insert(eventList);
})
.then(function() {
	console.log('fin')
})
.catch(function(err) {
	console.error(err);
})
;

// var getLocationDetails = function() {
// 	Promise.all(asyncResults)
// 	.then(function(results){

// 	})
// 	.catch(function(err) {
// 		console.log(err);
// 	});
// }
