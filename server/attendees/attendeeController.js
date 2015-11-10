var Attendee = require('./AttendeeModel.js');


module.exports = {

  allAttendees: function (req, res, next) {
  	
    Attendee.get()
    .then(function (attendees) {
      res.json(attendees);
    })
    .catch(function (error) {
      next(error);
    });
  }

};
