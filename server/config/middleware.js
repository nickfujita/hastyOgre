var morgan = require('morgan');
var bodyParser = require('body-parser');
var helpers = require('./helpers.js');


module.exports = function (app, express) {
 
  var eventRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  app.use('/api/events', eventRouter);
  // app.use(helpers.errorLogger);
  // app.use(helpers.errorHandler);

  require('../events/eventRoutes.js')(eventRouter);
};
