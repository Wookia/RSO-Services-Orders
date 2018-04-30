const Responder = require('./responder');
const MenuDB = require('./storage/menu_db');

class Menu extends Responder {
    constructor(app) {
        super(app, new MenuDB(), '/orders/menu', 'menu');
    }
}

module.exports = Menu;
