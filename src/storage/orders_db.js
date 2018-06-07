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
                table: {type: Sequelize.STRING},
                waiter: {type: Sequelize.STRING},
                state: {type: Sequelize.STRING},
                dishes: {type: Sequelize.ARRAY(Sequelize.INTEGER)}
            };
            this.initialize('order', ordersTableModel, true)
                .then(() => {
                    this.add({table: 11, waiter: "A", state: "start", dishes: []});
                    this.add({table: 13, waiter: "A", state: "ordering", dishes: [1, 4]});
                    this.add({table: 22, waiter: "B", state: "kitchen", dishes: [2, 5]});
                    this.add({table: 25, waiter: "B", state: "ready-to-deliver", dishes: [2, 4]});
                    this.add({table: 27, waiter: "B", state: "end", dishes: [3, 4]});

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
