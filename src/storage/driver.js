const Sequelize = require('sequelize');
let Promise = require("bluebird");


function createConnection() {
    // TODO create process.env.* variables in docker configuration
    const DB_HOST = getDbHost();
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
                reject(err);
            });
    });
}

function getDbHost() {
    let host = '';
    const isWin = process.platform === "win32";
    if (isWin === true) {
        console.log('System: Windows');
        host = 'localhost';
    } else {
        console.log('System: Linux/Mac');
        host = '192.168.99.100';
    }
    return host;
}

let sequelize = createConnection();
let dbDriverPromise = getValidConnection(sequelize);
module.exports = dbDriverPromise;


