const express = require("express");
const todoctrl = require("./controllers/todoctrl");
var app = express()
var session = require('cookie-session')
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('views'));

// session creation
app.use(session({secret: 'todotopsecret'}),)
.use(function(req, res, next){
    // checks if a list already exists
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = []
    }
    next()
})
  .get("/todo", todoctrl.todo_display)
  .post("/todo/add/", urlencodedParser, todoctrl.todo_add)
  .get("/todo/delete/:id", todoctrl.todo_delete)
  .post("/todo/modify/", urlencodedParser, todoctrl.todo_modify)
  .get("/todo/see/:id", todoctrl.todo_see)
  .listen(3000, console.log("running on :3000"))

