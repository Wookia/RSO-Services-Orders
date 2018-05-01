const express = require('express');
const bodyParser = require('body-parser');

let Promise = require("bluebird");

const Sequelize = require('sequelize');
let dbDriverPromise = require('./storage/driver');

const Menu = require('./api/menu');
const Orders = require('./api/orders');

let app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

dbDriverPromise
    .then((dbDriver) => {
        let menu = new Menu(app);
        let orders = new Orders(app);

        app.listen(process.env.PORT || 3000, () => console.log('Orders backend listening on port: ' + (process.env.PORT || 3000)));




        const MENU = dbDriver.define('menu', {
            group: {type: Sequelize.STRING},
            name: {type: Sequelize.STRING},
            description: {type: Sequelize.TEXT},
            price: {type: Sequelize.FLOAT}
        });

        return new Promise((resolve, reject) => {
            // force: true will drop the table if it already exists
            resolve(MENU.sync({force: false}));
        });
    });
    // .then(() => {
    //     MENU.create({group: "Drinks", name: "Wine 1", description: "cheap wine", price: 10});
    //     MENU.create({group: "Drinks", name: "Wine 2", description: "expensive wine", price: 20});
    //     MENU.create({group: "Drinks", name: "Wine 3", description: "cheap wine", price: 10});
    //     MENU.create({group: "MainCourse", name: "Chicken 1", description: "good after gym", price: 10});
    //     MENU.create({group: "MainCourse", name: "Chicken 2", description: "dinner for couple", price: 20});
    //
    //     MENU.findAll().then(dishes => {
    //         for (let index in dishes)
    //             console.log(dishes[index].dataValues);
    //     });
    // });


