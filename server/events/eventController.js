var Event = require('./eventModel.js');


module.exports = {

  allEvents: function (req, res, next) {
  	
    Event.get()
    .then(function (events) {
      res.json(events);
    })
    .catch(function (error) {
      next(error);
    });
  }

};
