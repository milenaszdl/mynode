const express = require('express');
const router = express.Router();

var stats = {user_agent:0};

router.get('/', function(req,res) {
    res.send('Привет');
})

router.get('/stats', function(req,res) {
    stats.user_agent++;
    // res.setHeader("Content-Type", "text/html");
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

router.post('/comments', function(req,res) {
    body = "";
    req.on("data", (chunk)=>{
        body+= chunk.toString();
    })
    req.on("end", ()=>{
        res.end(body); //полученные сервером данные выводим обратно клиенту
        console.log(body); //выводим данные, полученные на сервер в консоль
    })
})

module.exports = router;