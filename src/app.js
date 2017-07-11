import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import ListItems from './components/list-items.js'
import AddItem from './components/add-item.js'

function status(response) {
  if (response.status >= 200 && response.status < 300) return Promise.resolve(response)
  else return Promise.reject(new Error(response.statusText))
}

function json(response) {
  return response.json()
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.getTodos()
  }

  getTodos = () => {
    fetch('/todos')
      .then(status)
      .then(json)
      .then(data => this.setState( {todos: data} ))
      .catch(error => console.log('Request failed', error))
  }
  addTodo = (newTodoTitle) => {
    const newTodo = {
      title: newTodoTitle,
      status: 'open',
      _id: Math.random().toString(36).substring(7)
    }
    let todos = this.state.todos
    todos.push(newTodo)
    this.setState({todos})
    // need to add this to the database And then return its new unique id
  }
  completeTodo = () => {
    // we're doing this next!!
  }
  updateStatus = (id, status) => {
    const todoToUpdate = this.state.todos.find(todo => todo._id === id)
    todoToUpdate.status = status
    this.setState({todos: this.state.todos})
    // do the db work here:
  }
  updateTitle = (id, title) => {
    const todoToUpdate = this.state.todos.find(todo => todo._id === id)
    todoToUpdate.title = title
    todoToUpdate.status = 'open'
    this.setState({todos: this.state.todos})
    // do the DB work
  }
  deleteTodo = (id) => {
    const todos = this.state.todos.filter(todo => todo._id !== id)
    this.setState({todos})
    // need to add db delete here:
  }
  removeAllEditStatus = () => {
    const todos = this.state.todos.map(todo => {
      if (todo.status === 'edit') {
        todo.status = 'open'
      }
      return todo
    })
    this.setState({todos})
  }
  render() {
    return (
      <div>
        <h1>Eric's React To Do App</h1>
        <ListItems
          todos={this.state.todos}
          completeTodo={this.completeTodo}
          updateStatus={this.updateStatus}
          updateTitle={this.updateTitle}
          deleteTodo={this.deleteTodo}
          removeAllEditStatus={this.removeAllEditStatus}
        />
        <AddItem
          addTodo={this.addTodo}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('todo'))
