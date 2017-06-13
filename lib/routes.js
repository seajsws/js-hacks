const fortune = require('./fortune');

module.exports = function(app){
  var path = require('path');

  //API Routes
  app.get('/', function(req, res){
    res.type('text/html');
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });

  app.get('/fortune', function(req, res) {
    res.type('application/json');
    res.json({fortune: fortune.getFortune()});
  });

}
