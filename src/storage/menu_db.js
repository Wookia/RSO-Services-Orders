const Sequelize = require('sequelize');

const Table = require('./table');


class MenuDB extends Table {
    constructor(dbDriver) {
        super(dbDriver);

        const modelColumns = {
            group: {type: Sequelize.STRING},
            name: {type: Sequelize.STRING},
            description: {type: Sequelize.TEXT},
            price: {type: Sequelize.FLOAT}
        };
        this.initializeModel('menu', modelColumns, true)
            .then(() => {
                this.add({group: "Drinks", name: "Wine 1", description: "cheap wine", price: 10});
                this.add({group: "Drinks", name: "Wine 2", description: "expensive wine", price: 20});
                this.add({group: "Drinks", name: "Wine 3", description: "cheap wine", price: 10});
                this.add({group: "MainCourse", name: "Chicken 1", description: "good after gym", price: 10});
                this.add({group: "MainCourse", name: "Chicken 2", description: "dinner for couple", price: 20});
            });
    }
}

module.exports = MenuDB;
