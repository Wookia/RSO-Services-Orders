const Responder = require('./responder');
const OrdersDB = require('../storage/orders_db');

class Orders extends Responder {
    constructor(app, dbDriver) {
        super(app, new OrdersDB(dbDriver), '/orders', 'orders');

        this.app.post(this.path + '/dish/:id', (req, res) => {
            console.log('POST ' + this.name + '/add ' + req.params.id + ' ' + JSON.stringify(req.body));
            this.handlePromiseResponse(this.database.addDish(parseInt(req.params.id), req.body), res);
        });

        this.app.delete(this.path + '/dish/:id', (req, res) => {
            console.log('DELETE ' + this.name + ' ' + req.params.id);
            this.handlePromiseResponse(this.database.deleteDish(parseInt(req.params.id), req.body), res);
        });
    }
}

module.exports = Orders;
