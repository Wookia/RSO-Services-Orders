const express = require('express');
const bodyParser = require('body-parser');

let dbDriverPromise = require('./storage/driver');
const Menu = require('./api/menu');
const Orders = require('./api/orders');

let app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

dbDriverPromise
    .then((dbDriver) => {
        let menu = new Menu(dbDriver);
        app.use("", menu.getEndPointRouter());
        let orders = new Orders(dbDriver);
        app.use("", orders.getEndPointRouter());

        app.listen(process.env.PORT || 3000, () => console.log('Orders backend listening on port: ' + (process.env.PORT || 3000)));
    });
