var Promise = require('bluebird');
var db = require('monk')('mongodb://ogre:m0n3yl0v333@ds043694.mongolab.com:43694/hastyogre');

Promise.promisifyAll(db);

var locations = db.get('locations');


module.exports = locations;









// var mongoose = Promise.promisifyAll(require('mongoose'));

// mongoose.connect('mongodb://ogre:m0n3yl0v333@ds043694.mongolab.com:43694/hastyogre');

// module.exports = mongoose;