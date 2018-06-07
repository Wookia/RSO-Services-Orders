let dbDriverPromise = require('../../src/storage/driver');


describe('DB Driver', () => {
    let dbDriver = {};

    beforeAll((done) => {
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
});
