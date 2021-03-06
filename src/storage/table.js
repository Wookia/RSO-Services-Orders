const Sequelize = require('sequelize');

class Table {
    constructor(dbDriver) {
        this.dbDriver = dbDriver;
        this.model = {};
    }

    initialize(name, columns) {
        this.model = this.dbDriver.define(name, columns);

        let config = {
            force: process.env.TESTS ? true : false
        };

        return new Promise((resolve, reject) => {
            resolve(this.model.sync(config));
        });
    }

    add(body) {
        return new Promise((resolve, reject) => {
            this.model.create(body)
                .then(model => {
                    resolve(model.dataValues);
                });
        });
    }

    getAll(constraints) {
        return new Promise((resolve, reject) => {
            const where = {
                where: constraints
            };
            this.model.findAll(where)
                .then(collection => {
                    let records = [];
                    for (let index in collection)
                        records.push(collection[index].dataValues);
                    resolve(records);
                }).catch(e => {
                    console.log(e);
                });
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            this.model.findById(id)
                .then(collection => {
                    if (collection !== null)
                        resolve(collection.dataValues);
                    else
                        reject(new Error('Internal database error: constraints failed'));
                })
        });
    }

    update(id, body) {
        return new Promise((resolve, reject) => {
            const where = {
                where: {id: id}
            };
            this.model.update(body, where)
                .then(result => {
                    if (result.length === 1)
                        resolve(this.findById(id));
                    else
                        throw new Error('Internal database error: constraints failed');
                });
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            let recordForDeletion = {};
            this.findById(id)
                .then(record => {
                    recordForDeletion = record;
                    const where = {
                        where: {id: id}
                    };
                    return this.model.destroy(where);
                })
                .then(result => {
                    if (result === 1)
                        resolve(recordForDeletion);
                    else
                        throw new Error('Internal database error: constraints failed');
                });
        });
    }
}

module.exports = Table;
