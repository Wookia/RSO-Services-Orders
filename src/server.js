let Promise = require("bluebird");

module.exports.startServer = new Promise((resolve, reject) => {
    const express = require('express');
    let app = express();

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });

    let dbDriver;
    let dbDriverPromise = require('./storage/driver');
    dbDriverPromise
        .then((driver) => {
            dbDriver = driver;

            const Menu = require('./api/menu');
            let menu = new Menu(dbDriver);
            app.use("", menu.getEndPointRouter());
            return menu.database.initializeModel();
        })
        .then(() => {
            const Orders = require('./api/orders');
            let orders = new Orders(dbDriver);
            app.use("", orders.getEndPointRouter());
            return orders.database.initializeModel();
        })
        .then(() => {
            app.listen(process.env.PORT || 3000, () => console.log('Orders backend listening on port: ' + (process.env.PORT || 3000)));
            resolve();
        });
});
