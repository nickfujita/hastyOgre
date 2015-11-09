var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));

 mongoose.connect('mongodb://ogre:m0n3yl0v333@ds043694.mongolab.com:43694/hastyogre');

module.exports = mongoose;