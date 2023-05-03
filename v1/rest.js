const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');

router.use(express.json());

const commentsController = require("../controllers/comments");

const jsonParser = bodyParser.json({
    extended: false,
});

var stats = {user_agent:0};
var comments = [];

const user = {name: "milena", email: "milicca0708083@mail.ru", password: "milena228"};

router.get('/', function(req,res) {
    res.send('Привет');
})

//юзаем обработчики для бд
router.get("/dbcomments", commentsController.getAllComments);
router.get("/dbcomments/:id", commentsController.getComment);
router.post("/dbcomments", express.json(), commentsController.postAddComments);
//router.get("/dbcommnets/:name", commentsController.getCommentByName);

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

function CheckLogin(req,res,next){
    if (req.body.name == user.name){
        next();
    } else {
        res.send("Invalid login");
    }
}

router.post('/login', jsonParser, CheckLogin, (req,res) => {
    res.status(228).send(`Welcome, ${user.name}`);
})

router.post('/comments', express.json(),function(req,res) {
    comments.push(req.body.name, req.body.comment);
    res.status(201);
    res.send(JSON.stringify(comments));
})

function CheckAuthorisation(req, res, next){
    const apiKey = req.query.apiKey;
    if (apiKey === 'getauthorised'){
        next();
    } else {
        res.send("Authorisation denied");
    }
}

router.post('/author', CheckAuthorisation, (req,res) => {
    res.status(215).send("Authorisation passed");
})


router.use((req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.status(404).send("Not found");
});

module.exports = router;