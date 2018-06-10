const Sequelize = require('sequelize');
let Promise = require("bluebird");

const Table = require('./table');


class MenuDB extends Table {
    constructor(dbDriver) {
        super(dbDriver);
    }

    initializeModel() {
        return new Promise((resolve, reject) => {
            const modelColumns = {
                group: {type: Sequelize.STRING},
                name: {type: Sequelize.STRING},
                description: {type: Sequelize.TEXT},
                price: {type: Sequelize.FLOAT}
            };
            this.initialize('menu', modelColumns, true)
                .then(() => {
                    return this.getAll();
                })
                .then(result => {
                    if (result.length !== 0) {
                        resolve();
                        return;
                    }

                    this.add({group: "Drinks", name: "Wine 1", description: "cheap wine", price: 10})
                        .then(() => {
                            this.add({group: "Drinks", name: "Wine 2", description: "expensive wine", price: 20})
                        })
                        .then(() => {
                            this.add({group: "Drinks", name: "Wine 3", description: "cheap wine", price: 10})
                        })
                        .then(() => {
                            this.add({
                                group: "MainCourse", name: "Chicken 1", description: "good after gym", price: 10})
                        })
                        .then(() => {
                            this.add({
                                group: "MainCourse", name: "Chicken 2", description: "dinner for couple", price: 20})
                        })
                        .then(() => {
                            resolve();
                        });
                });
        });
    }
}

module.exports = MenuDB;
