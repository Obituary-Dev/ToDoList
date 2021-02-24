
var Task = require('../Task');
const todo_display = (req,res) => {
    res.render('todo.ejs', {todolist: req.session.todolist})
}; 
const todo_add = (req,res) => {
    if (req.body.newtodo != '') {
        console.log(req.body.newtodo)
        // only create and send an object to EJS
        let _Task = new Task(req.body.newtodo, req.body.priority);
        console.log(_Task);
        req.session.todolist.push(_Task);

    }
    res.redirect('/todo')
}; 
const todo_delete = (req,res) => {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1)
    }
    res.redirect('/todo')
}; 
const todo_modify = (req,res) => {
    console.log("Idx for modification : ", req.body.idx);
    if (req.body.idx != '') {
        //TODO modify object value identified with idx
        console.log(req.session.todolist[req.body.idx].description, ' ► ', req.body.newtodo);
        req.session.todolist[req.body.idx].priority = req.body.priority;
        req.session.todolist[req.body.idx].description = req.body.newtodo;
    } 
    res.redirect('/todo');
}; 
const todo_see = (req,res) => {
    if (req.params.id != '') {
        console.log("Jack said : ",req.params.id, {todolist: req.session.todolist, index: req.params.id})
        res.render('todomodify.ejs', {todolist: req.session.todolist, index: req.params.id});       // req.params.id
    } else {
        res.redirect('/todo');
    }
}; 

module.exports = {
    todo_display,
    todo_add,
    todo_delete,
    todo_modify,
    todo_see
}