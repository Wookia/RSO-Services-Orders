const Responder = require('./responder');
const MenuDB = require('../storage/menu_db');

class Menu extends Responder {
    constructor(app, dbDriver) {
        super(app, new MenuDB(dbDriver), '/orders/menu', 'menu');
    }
}

module.exports = Menu;
