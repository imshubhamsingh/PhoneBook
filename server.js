var express = require('express');
var app = express();
var path = require('path');
// must specify options hash even if no options provided!
var phpExpress = require('php-express')({

    // assumes php is in your PATH
    binPath: 'php'
});

// set view engine to php-express
app.set('views', path.join(__dirname));
app.engine('php', phpExpress.engine);
app.set('view engine', 'php');


// routing all .php file to php-express
app.all(/.+\.php$/, phpExpress.router);

app.use(express.static(__dirname));

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
});
