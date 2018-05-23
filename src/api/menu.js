const Controller = require('./controller');
const MenuDB = require('../storage/menu_db');

class Menu extends Controller {
    constructor(app, dbDriver) {
        super(app, new MenuDB(dbDriver), '/api/menu', 'menu');
    }
}

module.exports = Menu;
