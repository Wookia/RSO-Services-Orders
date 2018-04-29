const Responder = require('./responder')
const OrdersDB = require('./orders_db');

class Orders extends Responder {
    constructor(app) {
        super(app, new OrdersDB(), '/orders', 'orders');
    }
}

module.exports = Orders;
