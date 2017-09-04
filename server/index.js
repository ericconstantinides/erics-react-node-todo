const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3001

// routes:
const routes = require('./routes/index')
// const users = require('./routes/users')
const todos = require('./routes/todos')

// Use native Node promises
mongoose.Promise = global.Promise

// connect to MongoDB
mongoose.connect('mongodb://localhost/monkey')
  .then(() => console.log('connection to erics-node-todo db successful'))
  .catch((err) => console.error(err))

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)
// app.use('/users', users)
app.use('/todos', todos)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

// Starting up the server
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})

module.exports = app
