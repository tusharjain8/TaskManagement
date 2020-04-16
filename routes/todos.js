const { Router } = require('express')
const { Todos } = require('../db')

const route = Router()

route.get('/:orderby', async(req, res) => {
    // const sort = document.getElementById('sortby').value
    const sort = req.params.orderby;
    const todos = await Todos.findAll({
        order: [
            [sort, 'ASC']
        ]
    })
    res.send(todos)

})

route.get('/', async(req, res) => {
    // const todos = await Todos.findAll()
    const todos = await Todos.findAll()

    res.send(todos)
})



route.post('/', async(req, res) => {
    if (typeof req.body.title !== 'string') {
        return res.status(400).send({ error: 'Task name not provided' })
    }

    const newTodo = await Todos.create({
        title: req.body.title,
        status: req.body.status,
        description: req.body.description,
        priority: req.body.priority,
        duedate: req.body.duedate,
    })

    res.status(201).send({ success: 'New task added', data: newTodo })
})

route.patch('/:id', async(req, res) => {
    console.log("patch hit")
    if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
            error: 'Todo ID must be an integer'
        })
    }

    const todo = await Todos.findByPk(req.params.id)
    console.log(todo);

    if (!todo) {
        return res.status(404).send({
            error: " No Todo found with id = " + req.params.id
        })
    }

    todo.duedate = req.body.update_duedate
    todo.priority = req.body.update_priority
        //  if(todo.status !== req.body.update_status){
    todo.status = req.body.update_status

    //db save
    await todo.save()
    res.status(201).send({ success: "Updated Successfully", data: todo })
})

module.exports = route