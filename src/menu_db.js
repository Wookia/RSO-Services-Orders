const Database = require('./database');

class MenuDB extends Database {
    constructor() {
        super();

        this.add({group: "Drinks", name: "Wine 1", description: "cheap wine", price: 10});
        this.add({group: "Drinks", name: "Wine 2", description: "expensive wine", price: 20});
        this.add({group: "Drinks", name: "Wine 3", description: "cheap wine", price: 10});
        this.add({group: "MainCourse", name: "Chicken 1", description: "good after gym", price: 10});
        this.add({group: "MainCourse", name: "Chicken 2", description: "dinner for couple", price: 20});
    }

    add(body) {
        const record = {
            id: this.id++,
            group: body.group,
            name: body.name,
            description: body.description,
            price: body.price
        };
        this.records.push(record);
        return record;
    }
}

module.exports = MenuDB;
