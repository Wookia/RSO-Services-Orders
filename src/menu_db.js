class MenuDB {
    constructor() {
        this.menu_id = 1;
        this.menu = [];

        this.add({group: "Drinks", name: "Wine 1", description: "cheap wine", price: 10});
        this.add({group: "Drinks", name: "Wine 2", description: "expensive wine", price: 20});
        this.add({group: "Drinks", name: "Wine 3", description: "cheap wine", price: 10});
        this.add({group: "MainCourse", name: "Chicken 1", description: "good after gym", price: 10});
        this.add({group: "MainCourse", name: "Chicken 2", description: "dinner for couple", price: 20});
    }

    getAll() {
        return this.menu;
    }

    findMatches(filter) {
        let result = this.getAll();
        for (let key in filter)
            result = result.filter(e => e[key] == filter[key]);
        return result;
    }

    add(body) {
        const record = {
            id: this.menu_id++,
            group: body.group,
            name: body.name,
            description: body.description,
            price: body.price
        };
        this.menu.push(record);
        return record;
    }

    update(id, body) {
        let record = this.menu.find(e => e.id === parseInt(id));

        for (let key in body)
            record[key] = body[key];

        return record;
    }

    delete(id) {
        const record = this.menu.find(e => e.id === parseInt(id));
        const index = this.menu.indexOf(record);
        if (index > -1) {
            this.menu.splice(index, 1);
            return record;
        }
        console.log('ERROR: element do not exist');
        return {type: 'ERORR', description: "Element do not exist"};
    }
}

module.exports = MenuDB;
