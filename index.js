var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(requireHTTPS);
app.use(express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules/callyjs/dist'));
app.use('/scripts', express.static(__dirname + '/node_modules/ics-js/dist'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get("/cache.manifest", function(req, res){
  res.header("Content-Type", "text/cache-manifest");
  res.sendFile(path.join(__dirname, '/public', 'cache.manifest'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function requireHTTPS(req, res, next) {
  if(req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] === "http") {
         return res.redirect('https://' + req.get('host') + req.url);
    }
        next();
}
