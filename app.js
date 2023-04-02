const http = require('node:http');

const host = "127.0.0.1"
const port = 5500

const users = [{id:1, name: "Vasya"}, {id:2, name: "Milena"}]

const server = http.createServer((req,res)=>{
    if (req.url === "/") {
        res.statusCode = 201;
        res.setHeader("Content-type", "text/plain");
        res.end("Hi");
    }else if (req.url === "/user") {
        if (req.method === "GET") {
            res.statusCode = 200;
            res.setHeader("Content-type", "application/json");
            res.end(JSON.stringify(users));
        } else if (req.method === "POST") {
            body = "";
            req.on("data", (chunk)=>{
                body+= chunk.toString();
            })
            req.on("end", ()=>{
                res.end(body);
            })
        } else{
            res.statusCode = 400;
            res.setHeader("Content-type", "text/plain");
            res.end("Bad method");
        }
    }else {
        res.statusCode = 404;
        res.setHeader("Content-type", "text/plain");
        res.end("Not found");
    }

    // res.statusCode = 200;
    // res.setHeader("Content-type", "text/html");
    // res.end("{status: 400, message: error}");
});

server.on("connection", ()=> {
    console.log("Новое подключение");
});

server.listen(port,host,()=> {
    console.log(`Server is on. http://${host}:${port}`);
})