const Sequelize = require('sequelize');

const Table = require('./table');


class OrdersDB extends Table {
    constructor(dbDriver) {
        super(dbDriver);
        const ordersTableModel = {
            table: {type: Sequelize.STRING},
            waiter: {type: Sequelize.STRING},
            state: {type: Sequelize.STRING},
            dishes: {type: Sequelize.ARRAY(Sequelize.INTEGER)}
        };
        this.initializeModel('order', ordersTableModel, true)
            .then(() => {
                this.add({table: 11, waiter: "A", state: "start", dishes: [2, 4]});
                this.add({table: 13, waiter: "A", state: "ordering"});
                this.add({table: 22, waiter: "B", state: "kitchen"});
                this.add({table: 25, waiter: "B", state: "ready-to-deliver"});
                this.add({table: 27, waiter: "B", state: "end"});
            });
    };

    addDish(orderID, body) {
        return new Promise((resolve, reject) => {
            this.findById(orderID)
                .then(record => {
                    const dishID = parseInt(body["dish"]);
                    let dishes = record.dishes;
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
                    const index = dishes.findIndex(e => e === dishID);
                    if(index > -1)
                        dishes.splice(index, 1);
                    resolve(this.update(orderID, {dishes: dishes}));
                });
        });
    }
}

module.exports = OrdersDB;
