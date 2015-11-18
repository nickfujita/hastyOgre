import * as fbApi from './api/cronFbHelper';
import * as locations from './db/locations.js';
import * as events from './db/events.js';
import * as eventsBackup from './db/eventsBackup.js';
import * as locationDetails from './db/locationDetails.js';
// import * as Promise 'bluebird';

var asyncResults = [];

// back up events
// this logic is not great....if we have more event in the upcoming months backups will work fine, but not if we have less events
// look to do backups in cole storage instead of with collection
asyncResults.push(events.count());
asyncResults.push(eventsBackup.count());
//check to see if there are more events in the 
Promise.all(asyncResults)
.then( counts => {
	console.log(counts[0] +' > '+ counts[1]);
	if(counts[0] > counts[1]) {
		return new Promise((resolve,reject) => {
			console.log('about to remove backup');
			eventsBackup.remove()
			.then(() => {
				console.log('extracting records for backup');
				return events.get()
			})
			.then( records => {
				console.log('pushing records into backup');
				return eventsBackup.insert(records);
			})
			// .then(function() {
			// 	console.log('clearing way for new events');
			// 	return events.remove();
			// })
			.then(() => {
				resolve();
			})
			.catch((err) => {
				reject(err);
			})
			;
		});
	} else {
		return;
	}
		// asyncResults.push(events.remove());
})
.then(() => {
	return events.remove();
})
	// return Promise.all(asyncResults);
// })
.then(() => {
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
.then( locationDetails => {
	console.log('pulling events for locations');
	asyncResults = [];
	locationDetails.forEach( location => {
		if(location.id !== '50112151664') {
  		asyncResults.push(fbApi.getEventsByLocation(location.id));
  	}
	});

	return Promise.all(asyncResults);
})
//flattening results by location into one array of events
.then( eventsResults => {
	var flattened = eventsResults.reduce((a, b) => {
	  return a.concat(b.data);
	}, []);
	// return events.insert(flattened);
	return flattened;
})
//getting attendees for all events, running gender analysis on each, and adding them into events collection
.then( eventData => {
	console.log('about to pull all attendees per event');
	asyncResults = [];
	eventData.forEach( event => {
  	asyncResults.push(new Promise((resolve, reject) => {

  		fbApi.getAttendeesByEvent(event.id)
  		.then( data => {
  			event.demographics = data;
  			resolve(event);
  		})
  		.catch( err => {
  			console.error(err);
  			reject(err);
  		});

  	}));
	});
	console.log('done with all attendee')
	return Promise.all(asyncResults);
})
//insert data into mongo events
.then( eventList => {
	console.log('inserting events into mongo')
	return events.insert(eventList);
})
.then(() => {
	console.log('fin')
})
.catch( err => {
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
