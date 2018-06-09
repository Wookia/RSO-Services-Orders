const Controller = require('./controller');
const MenuDB = require('../storage/menu_db');

class Menu extends Controller {
    constructor(dbDriver) {
        super(new MenuDB(dbDriver), '/api/menu', 'menu',
            {GET: ['/api/menu']});
    }
}

module.exports = Menu;
