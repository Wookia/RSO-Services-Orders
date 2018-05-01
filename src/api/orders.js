const Responder = require('./responder');
const OrdersDB = require('../storage/orders_db');

class Orders extends Responder {
    constructor(app) {
        super(app, new OrdersDB(), '/orders', 'orders');

        this.app.post(this.path + '/dish/:id', (req, res) => {
            console.log('POST ' + this.name + '/add ' + req.params.id + ' ' + JSON.stringify(req.body));

            const record = this.database.addDish(parseInt(req.params.id), req.body);
            res.send(record);
        });

        this.app.delete(this.path + '/dish/:id', (req, res) => {
            console.log('DELETE ' + this.name + ' ' + req.params.id);

            const record = this.database.deleteDish(parseInt(req.params.id), req.body);
            res.send(record);
        });
    }
}

module.exports = Orders;
