const express = require('express');
const bodyParser = require('body-parser');

const Menu = require('./menu');

let app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/orders', (req, res) => {
    console.log("GET orders");
    res.json({
        responseFrom: "orders",
        status: "backend in development phase"
    });
});

let menu = new Menu(app);

app.listen(process.env.PORT || 3000, () => console.log('Orders backend listening on port: ' + (process.env.PORT || 3000)));
