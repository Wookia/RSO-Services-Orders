const MenuDB = require('./menu_db');

class Menu {
    constructor(app) {
        this.app = app;
        this.menu_db = new MenuDB();

        this.app.get('/orders/menu', (req, res) => {
            console.log('GET menu ' + JSON.stringify(req.query));

            if (req.query === null)
                return res.send(this.menu_db.getAll());

            const result = this.menu_db.findMatches(req.query);
            res.send(result);
        });

        this.app.get('/orders/menu/:id', (req, res) => {
            console.log('GET menu ' + req.params.id);

            const item = this.menu_db.getAll().find(e => e.id === parseInt(req.params.id));
            res.send(item);
        });

        this.app.post('/orders/menu', (req, res) => {
            console.log('POST menu ' + JSON.stringify(req.body));

            const record = this.menu_db.add(req.body);
            res.send(record);
        });

        this.app.put('/orders/menu/:id', (req, res) => {
            console.log('PUT menu ' + req.params.id + ' ' + JSON.stringify(req.body));

            const record = this.menu_db.update(req.params.id, req.body);
            res.send(record);
        });

        this.app.delete('/orders/menu/:id', (req, res) => {
            console.log('DELETE menu ' + req.params.id);

            const record = this.menu_db.delete(req.params.id);
            res.send(record);
        });
    }
}

module.exports = Menu;
