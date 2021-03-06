let router = require("express-promise-router")();
let bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

let jwt = require('express-jwt');
let fs = require('fs');


class Controller {
    constructor(database, path, name, noTokenEndpoints) {
        this.database = database;
        this.path = path;
        this.name = name;

        this.publicKey = fs.readFileSync('./dev-keys/public.pem');
        this.router = router;
        this.noTokenEndpoints = noTokenEndpoints;

        this.defineEndPoints();
    }

    defineEndPoints() {
        this.router.get(this.path, this.checkJwt({type: 'GET', endpoint: this.path}), (req, res) => {
            console.log('GET ' + this.name + ' ' + JSON.stringify(req.query));
            this.handlePromiseResponse(this.database.getAll(req.query), res);
        });

        this.router.get(this.path + '/:id', this.checkJwt(), (req, res) => {
            console.log('GET ' + this.name + ' ' + req.params.id);
            this.handlePromiseResponse(this.database.findById(parseInt(req.params.id)), res);
        });

        this.router.post(this.path, this.checkJwt(), (req, res) => {
            console.log('POST ' + this.name + ' ' + JSON.stringify(req.body));
            this.handlePromiseResponse(this.database.add(req.body), res);
        });

        this.router.put(this.path + '/:id', this.checkJwt(), (req, res) => {
            console.log('PUT ' + this.name + ' ' + req.params.id + ' ' + JSON.stringify(req.body));
            this.handlePromiseResponse(this.database.update(req.params.id, req.body), res);
        });

        this.router.delete(this.path + '/:id', this.checkJwt(), (req, res) => {
            console.log('DELETE ' + this.name + ' ' + req.params.id);
            this.handlePromiseResponse(this.database.delete(req.params.id), res);
        });
    }

    getEndPointRouter() {
        return this.router;
    }

    handlePromiseResponse(promiseObj, res) {
        promiseObj
            .then(result => {
                res.send(result);
            });
    }

    checkJwt(endpoint) {
        if (process.env.TESTS
            || (endpoint !== undefined
                && this.noTokenEndpoints[endpoint.type] !== undefined
                && this.noTokenEndpoints[endpoint.type].indexOf(endpoint.endpoint) > -1)) {
            return (token, secret, next) => {
                next();
            };
        } else {
            return jwt({secret: this.publicKey, algorithms: ['RS256']});
        }
    }
}

module.exports = Controller;
