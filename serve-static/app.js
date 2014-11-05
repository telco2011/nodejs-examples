var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
//app.use('/static', express.static(__dirname + '/public', { maxAge: oneDay }));

app.listen(process.env.PORT || 3000);
console.log("Server listen on http://localhost:3000");