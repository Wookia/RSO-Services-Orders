class Responder {
    constructor(app, database, path, name) {
        this.app = app;
        this.database = database;
        this.path = path;
        this.name = name;

        this.defineEndPoints();
    }

    defineEndPoints() {
        this.app.get(this.path, (req, res) => {
            console.log('GET ' + this.name + ' ' + JSON.stringify(req.query));
            this.handlePromiseResponse(this.database.getAll(req.query), res);
        });

        this.app.get(this.path + '/:id', (req, res) => {
            console.log('GET ' + this.name + ' ' + req.params.id);
            this.handlePromiseResponse(this.database.findById(parseInt(req.params.id)), res);
        });

        this.app.post(this.path, (req, res) => {
            console.log('POST ' + this.name + ' ' + JSON.stringify(req.body));
            this.handlePromiseResponse(this.database.add(req.body), res);
        });

        this.app.put(this.path + '/:id', (req, res) => {
            console.log('PUT ' + this.name + ' ' + req.params.id + ' ' + JSON.stringify(req.body));
            this.handlePromiseResponse(this.database.update(req.params.id, req.body), res);
        });

        this.app.delete(this.path + '/:id', (req, res) => {
            console.log('DELETE ' + this.name + ' ' + req.params.id);
            this.handlePromiseResponse(this.database.delete(req.params.id), res);
        });
    }

    handlePromiseResponse(promiseObj, res) {
        promiseObj
            .then(result => {
                res.send(result);
            });
    }
}

module.exports = Responder;
