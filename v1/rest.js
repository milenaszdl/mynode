const express = require('express');
const router = express.Router();

var stats = {user_agent:0};
var comments = [];

router.get('/', function(req,res) {
    res.send('Привет');
})

router.get('/stats', function(req,res) {
    stats.user_agent++;
    // res.setHeader("Content-Type", "text/html");
    res.status(200);
    res.send(`<table>
        <tr>
            <th>User-agent:</th>
            <th>Number of requests:</th>
        </tr>
        <tr>
            <td>${req.headers['user-agent']}</td>
            <td>${stats.user_agent}</td>
        </tr>
    </table>`);
})

router.post('/comments', express.json(),function(req,res) {
    comments.push(req.body.name, req.body.comment);
    res.status(201);
    res.send(JSON.stringify(comments));
})

module.exports = router;