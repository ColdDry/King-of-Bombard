/**
 * Created by XJX on 2016/10/8.
 */

var express = require('express');
var app = express();
var port = process.env.port || 1991;

app.listen(port,function () {
    console.log('KOB is started on port 1991!');
});

app.use(express.static(__dirname+'/app'));


app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(404).send('Can not find!');
});
