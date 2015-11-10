var attendeeController = require('./attendeeController.js');

module.exports = function (app) {

  app.route('/')
    .get(attendeeController.allAttendees);

};
