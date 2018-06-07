const Sequelize = require('sequelize');
let Promise = require("bluebird");

const Table = require('./table');


class OrdersDB extends Table {
    constructor(dbDriver) {
        super(dbDriver);
    };

    initializeModel() {
        return new Promise((resolve, reject) => {
            const ordersTableModel = {
                table: {type: Sequelize.INTEGER},
                waiter: {type: Sequelize.STRING},
                state: {type: Sequelize.STRING},
                dishes: {type: Sequelize.ARRAY(Sequelize.INTEGER)}
            };
            this.initialize('order', ordersTableModel, true)
                .then(() => {
                    resolve();
                });
        });
    }

    addDish(orderID, body) {
        return new Promise((resolve, reject) => {
            this.findById(orderID)
                .then(record => {
                    const dishID = parseInt(body["dish"]);
                    let dishes = record.dishes;
                    if (dishes === null)
                        dishes = [];
                    dishes.push(dishID);
                    resolve(this.update(orderID, {dishes: dishes}));
                });
        });
    }

    deleteDish(orderID, body) {
        return new Promise((resolve, reject) => {
            this.findById(orderID)
                .then(record => {
                    const dishID = parseInt(body["dish"]);
                    let dishes = record.dishes;
                    if (dishes === null)
                        dishes = [];
                    const index = dishes.findIndex(e => e === dishID);
                    if (index > -1)
                        dishes.splice(index, 1);
                    resolve(this.update(orderID, {dishes: dishes}));
                });
        });
    }
}

module.exports = OrdersDB;
