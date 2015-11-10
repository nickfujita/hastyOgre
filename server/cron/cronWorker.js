var fbApi = require('./api/cronFbHelper');
var locations = require('./db/locations.js');
var events = require('./db/events.js');
var attendees = require('./db/attendees.js');
var locationDetails = require('./db/locationDetails.js');
var Promise = require('bluebird');
var asyncResults = [];

locations.get()
.then(function(data) {
	console.log('just for the data from mongo');
	data.forEach(function(location,i) {
  	asyncResults.push(fbApi.getLocationDetails(location.id));
	});

	return Promise.all(asyncResults);
})
.then(function(locationDetails) {
	// return locationDetails.insert(locationDetails);
	return locationDetails;
})
.then(function(locationDetails) {
	asyncResults = [];
	locationDetails.forEach(function(location) {
  	asyncResults.push(fbApi.getEventsByLocation(location.id));
	});

	return Promise.all(asyncResults);
})
.then(function(eventsResults) {
	var flattened = eventsResults.reduce(function(a, b) {
	  return a.concat(b.data);
	}, []);
	// return events.insert(flattened);
	return flattened;
})
.then(function(eventData) {
	asyncResults = [];
	eventData.forEach(function(event) {
  	asyncResults.push(fbApi.getAttendeesByEvent(event.id));
	});
	console.log('done with all data insert into events')
	return Promise.all(asyncResults);
})
.then(function(eventAttendees) {
	console.log('inserting event attendees into mongo')
	return attendees.insert(eventAttendees);
	return;
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
