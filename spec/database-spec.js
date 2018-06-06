let dbDriverPromise = require('../src/storage/driver');


describe('DB Driver', () => {
    let dbDriver = {};

    beforeEach((done) => {
        dbDriverPromise.then((driver) => {
            dbDriver = driver;
            done();
        });
    });

    it('database', () => {
        expect(dbDriver.config.database).toBe('postgres');
    });

    it('username', () => {
        expect(dbDriver.config.username).toBe('postgres');
    });

    it('password', () => {
        expect(dbDriver.config.password).toBe('password');
    });

    it('host', () => {
        expect(dbDriver.config.host).toBe('192.168.99.100');
    });

    it('port', () => {
        expect(dbDriver.config.port).toBe(5432);
    });
});
