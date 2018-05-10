const Sequelize = require('sequelize');
let Promise = require("bluebird");


function createConnection() {
    // TODO create process.env.* variables in docker configuration
    const DB_HOST = 'orders-db';
    const DB_PORT = 5432;
    const DB_NAME = 'postgres';
    const DB_USER = 'postgres';
    const DB_PASSWORD = 'password';

    return new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        dialect: 'postgres',
        host: DB_HOST,
        port: DB_PORT
    });
}

function getValidConnection(dbDriver) {
    return new Promise((resolve, reject) => {
        dbDriver
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
                resolve(dbDriver);
            })
            .catch(err => {
                console.log('Connection to DB cannot be established at the moment');
                console.log(err.message);
                // reject(err);
                setTimeout(() => resolve(getValidConnection(dbDriver)), 10000);
            });
    });
}

let sequelize = createConnection();
let dbDriverPromise = getValidConnection(sequelize);
module.exports = dbDriverPromise;


