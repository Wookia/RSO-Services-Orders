const Database = require('./database');

class OrdersDB extends Database {
    constructor() {
        super();

        this.add({table: 11, waiter: "A", state: "start"});
        this.add({table: 13, waiter: "A", state: "ordering"});
        this.add({table: 22, waiter: "B", state: "kitchen"});
        this.add({table: 25, waiter: "B", state: "ready-to-deliver"});
        this.add({table: 27, waiter: "B", state: "end"});
    }

    add(body) {
        const record = {
            id: this.id++,
            table: body.table,
            waiter: body.waiter,
            dishes: [],
            state: body.state
        };
        this.records.push(record);
        return record;
    }

    addDish(recordID, body) {
        let record = this.findById(recordID);
        const dishID = parseInt(body["dish"]);
        record.dishes.push(dishID);
        return record;
    }

    deleteDish(recordID, body) {
        let record = this.findById(recordID);
        const dishID = parseInt(body["dish"]);
        const index = record.dishes.indexOf(dishID);
        if (index > -1) {
            record.dishes.splice(index, 1);
            return {dish: dishID};
        }
        console.log('ERROR: dont exist');
        return {type: 'ERROR', description: "Element do not exist"};
    }
}

module.exports = OrdersDB;
