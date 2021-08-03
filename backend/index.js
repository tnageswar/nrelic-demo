const config = require('config');
const express = require('express');
const cors = require('cors');
const users_dao = require('./dao/users_dao');

const app = express();
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cors());

app.use(function (err, req, res, next) {
    res.status(500).send('Some internal error occurred');
});

app.get('/nrelic/users', (req, res) => {
    res.send(users_dao.getAllUsers());
});

const server = app.listen(config.get('server.port'), () => {
    console.log(`Listening on ${config.get('server.port')}`);
});
