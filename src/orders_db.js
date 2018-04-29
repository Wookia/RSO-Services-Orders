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
            state: body.state
        };
        this.records.push(record);
        return record;
    }
}

module.exports = OrdersDB;
