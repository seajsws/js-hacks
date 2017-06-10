/**
 * Created by blakers757 a long, long time ago.
 */
module.exports = function(app){
  var path = require('path');

  //API Routes
  app.get('/', function(req, res){
    res.type('text/html');
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });

}
