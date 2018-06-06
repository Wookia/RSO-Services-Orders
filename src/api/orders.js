const Controller = require('./controller');
const OrdersDB = require('../storage/orders_db');

let jwt = require('express-jwt');


class Orders extends Controller {
    constructor(dbDriver) {
        super(new OrdersDB(dbDriver), '/api/orders', 'orders');

        this.router.post(this.path + '/:id/dish', jwt({secret: this.publicKey, algorithms: ['RS256']}), (req, res) => {
            console.log('POST ' + this.name + ' ' + req.params.id + ' /add ' + JSON.stringify(req.body));
            this.handlePromiseResponse(this.database.addDish(parseInt(req.params.id), req.body), res);
        });

        this.router.delete(this.path + '/:id/dish', jwt({secret: this.publicKey, algorithms: ['RS256']}), (req, res) => {
            console.log('DELETE ' + this.name + ' ' + req.params.id + ' /remove ' + JSON.stringify(req.body));
            this.handlePromiseResponse(this.database.deleteDish(parseInt(req.params.id), req.body), res);
        });
    }
}

module.exports = Orders;
