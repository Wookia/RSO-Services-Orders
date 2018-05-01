class Responder {
    constructor(app, database, path, name) {
        this.app = app;
        this.database = database;
        this.path = path;
        this.name = name;

        this.app.get(this.path, (req, res) => {
            console.log('GET ' + this.name + ' ' + JSON.stringify(req.query));

            if (Responder.isObjEmpty(req.query))
                return res.send(this.database.getAll());

            const result = this.database.findMatches(req.query);
            res.send(result);
        });

        this.app.get(this.path + '/:id', (req, res) => {
            console.log('GET ' + this.name + ' ' + req.params.id);

            const item = this.database.findById(parseInt(req.params.id));
            res.send(item);
        });

        this.app.post(this.path, (req, res) => {
            console.log('POST ' + this.name + ' ' + JSON.stringify(req.body));

            const record = this.database.add(req.body);
            res.send(record);
        });

        this.app.put(this.path + '/:id', (req, res) => {
            console.log('PUT ' + this.name + ' ' + req.params.id + ' ' + JSON.stringify(req.body));

            const record = this.database.update(req.params.id, req.body);
            res.send(record);
        });

        this.app.delete(this.path + '/:id', (req, res) => {
            console.log('DELETE ' + this.name + ' ' + req.params.id);

            const record = this.database.delete(req.params.id);
            res.send(record);
        });
    }

    static isObjEmpty(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object
    }
}

module.exports = Responder;
