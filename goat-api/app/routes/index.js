var api = require('../api');

module.exports  = function(app) {
  app.route('/v1/events')
          .get(api.list)
          .post(api.save);  
};