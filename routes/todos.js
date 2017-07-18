var express = require('express')
var router = express.Router()

var Todo = require('../models/Todo.js')

/* GET /todos listing. */
router.get('/', function(req, res, next) {
  Todo.find(function (err, todos) {
    if (err) return next(err)
    res.json(todos)
  })
})

/* POST /todos */
router.post('/', function(req, res, next) {
  Todo.create(req.body, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

/* GET /todos/id */
router.get('/:id', function(req, res, next) {
  Todo.findById(req.params.id, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

/* BATCH PATCH /todos/ */
router.patch('/', function(req, res, next) {
  res.json(req.body.map(todo => {
    const {_id} = todo
    if (todo.hasOwnProperty('_id')) delete todo._id
    Todo.findByIdAndUpdate(_id, todo, (err, post) => {
      if (err) return next(err)
      return post
    })
  }))
})

/* PUT /todos/:id */
router.put('/:id', function(req, res, next) {
  Todo.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err)
    res.statusMessage = 'Successfully Updated'
    res.json(post)
  })
})

/* PATCH /todos/:id */
router.patch('/:id', function(req, res, next) {
  if (req.body.hasOwnProperty('_id')) delete req.body._id
  Todo.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err)
    res.statusCode = '200'
    res.statusMessage = 'Successfully Updated'
    res.json(post)
  })
})

/* DELETE /todos/:id */
router.delete('/:id', function(req, res, next) {
  Todo.findByIdAndRemove(req.params.id, function (err, post) {
    if (err) return next(err)
    res.statusCode = '204'
    res.statusMessage = 'Successfully Deleted'
    res.body = {data: null}
    res.json()
  })
})

module.exports = router