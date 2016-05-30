var express = require('express');
var app = express();

app.use(express.static('src'));
app.listen(9000, function () {
  console.log('listening on port 9000!');
});