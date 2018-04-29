class Database {
    constructor() {
        this.id = 1;
        this.records = [];
    }

    getAll() {
        return this.records;
    }

    findById(id) {
        return this.records.find(e => e.id === id);
    }

    findMatches(filter) {
        let result = this.getAll();
        for (let key in filter)
            result = result.filter(e => e[key] == filter[key]);
        return result;
    }

    update(id, body) {
        let record = this.records.find(e => e.id === parseInt(id));

        for (let key in body)
            record[key] = body[key];

        return record;
    }

    delete(id) {
        const record = this.records.find(e => e.id === parseInt(id));
        const index = this.records.indexOf(record);
        if (index > -1) {
            this.records.splice(index, 1);
            return record;
        }
        console.log('ERROR: element do not exist');
        return {type: 'ERORR', description: "Element do not exist"};
    }
}

module.exports = Database;
