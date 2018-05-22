const express = require('express');
const bodyParser = require('body-parser');

let dbDriverPromise = require('./storage/driver');
const Menu = require('./api/menu');
const Orders = require('./api/orders');

let app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

dbDriverPromise
    .then((dbDriver) => {
        let menu = new Menu(app, dbDriver);
        let orders = new Orders(app, dbDriver);

        app.listen(process.env.PORT || 3000, () => console.log('Orders backend listening on port: ' + (process.env.PORT || 3000)));
    });
