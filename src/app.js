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
    this.api.get(data => this.setState({todos: data}))
  }
  addTodo = (newTodoTitle) => {
    const newTodo = {
      title: newTodoTitle,
      status: 'open',
    }
    const tempId = Math.random().toString(36).substring(7)
    // call the api BEFORE giving it a temp ID
    this.api.post(newTodo, data => {
      // buy the time we're in callback, we've already gone ahead and given the tempID
      const todoToUpdate = this.state.todos.find(todo => todo._id === tempId)
      todoToUpdate._id = data._id
      this.setState({todos: this.state.todos})
    })
    // give it a temp ID
    newTodo._id = tempId
    let todos = this.state.todos
    todos.push(newTodo)
    this.setState({todos})
  }
  updateStatus = (id, status) => {
    const todoToUpdate = this.state.todos.find(todo => todo._id === id)
    todoToUpdate.status = status
    this.setState({todos: this.state.todos})
    this.api.put(todoToUpdate)
  }
  updateTitle = (id, title) => {
    const todoToUpdate = this.state.todos.find(todo => todo._id === id)
    todoToUpdate.title = title
    todoToUpdate.status = 'open'
    this.setState({todos: this.state.todos})
    this.api.put(todoToUpdate)
  }
  deleteTodo = (id) => {
    const todos = this.state.todos.filter(todo => todo._id !== id)
    this.setState({todos})
    this.api.delete(id)
  }
  removeAllEditStatus = () => {
    const todos = this.state.todos.map(todo => {
      if (todo.status === 'edit') {
        todo.status = 'open'
        this.api.put(todo)
      }
      return todo
    })
    this.setState({todos})
  }
  // DB Events:
  api = {
    post(newTodo, callback) {
      fetch('/todos', {
          method: 'POST',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify(newTodo)
        })
        .then(status)
        .then(json)
        .then(data => callback(data))
        .catch(error => console.log('Request failed', error));
    },
    get(callback) {
      fetch('/todos')
        .then(status)
        .then(json)
        .then(data => callback(data))
        .catch(error => console.log('Request failed', error))
    },
    put(todo) {
      fetch(`/todos/${todo._id}`, {
          method: 'PUT',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({title: todo.title, status: todo.status})
        })
        .then(status)
        .catch(error => console.log('Request failed', error));
    },
    delete(dbId) {
      fetch(`/todos/${dbId}`, { method: 'DELETE' })
        .then(status)
        .catch(error => console.log('Request failed', error));
    }
  }
  render() {
    return (
      <div>
        <h1>Eric's React To Do App</h1>
        <ListItems
          todos={this.state.todos}
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
