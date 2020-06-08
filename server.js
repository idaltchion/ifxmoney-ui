const express = require('express');

const app = express();

app.use(express.static(__dirname + '/dist/ifxmoney-ui'));

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/dist/ifxmoney-ui/index.html');
});

/* variavel de ambiente existente no heroku */
app.listen(process.env.PORT || 4200);