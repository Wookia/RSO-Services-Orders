"use strict";

let Jasmine = require('jasmine');
let jasmine = new Jasmine();
jasmine.loadConfigFile();

jasmine.onComplete(function(){
    console.log("Jasmine Complete - Callback");  
    process.exit();  // Do this otherwise we may hang running tests
});

process.env.TESTS = true;
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = 3000;

jasmine.execute();