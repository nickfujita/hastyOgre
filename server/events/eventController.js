var Event = require('./eventModel.js');


module.exports = {

  allEvents: function (req, res, next) {
  	
    Event.find({})
    .then(function (events) {
      res.json(events);
    })
    .fail(function (error) {
      next(error);
    });
  }

};
