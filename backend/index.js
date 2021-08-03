const config = require('config');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cors());

const server = app.listen(config.get('server.port'), () => {
    console.log(`Listening on ${config.get('server.port')}`);
});
