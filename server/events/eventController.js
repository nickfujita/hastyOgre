var Event = require('./eventModel.js');


module.exports = {

  allEvents: function (req, res, next) {
  	
    Event.find({})
    .success(function (events) {
      res.json(events);
    })
    .error(function (error) {
      next(error);
    });
  }

};
