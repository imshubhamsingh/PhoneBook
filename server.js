var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname));

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
});
