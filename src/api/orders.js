const Controller = require('./controller');
const OrdersDB = require('../storage/orders_db');

class Orders extends Controller {
    constructor(app, dbDriver) {
        super(app, new OrdersDB(dbDriver), '/api/orders', 'orders');

        this.app.post(this.path + '/:id/dish', (req, res) => {
            console.log('POST ' + this.name + ' ' + req.params.id + ' /add ' + JSON.stringify(req.body));
            this.handlePromiseResponse(this.database.addDish(parseInt(req.params.id), req.body), res);
        });

        this.app.delete(this.path + '/:id/dish', (req, res) => {
            console.log('DELETE ' + this.name + ' ' + req.params.id + ' /remove ' + JSON.stringify(req.body));
            this.handlePromiseResponse(this.database.deleteDish(parseInt(req.params.id), req.body), res);
        });
    }
}

module.exports = Orders;
