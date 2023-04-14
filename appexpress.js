const express = require("express");

const host = "127.0.0.1";
const port = 5500;

const restApi = require('./v1/rest');
const app = express();

app.use(express.static('public'));

app.use('/v1', restApi);

app.listen(5500, '127.0.0.1', () => {
    console.log(`Server is on. http://${host}:${port}`);
})