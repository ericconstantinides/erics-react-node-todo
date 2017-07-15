import React, { Component } from 'react'

import './css/bootstrap.min.css';
import './css/bootstrap-theme.min.css';
import './App.css';

import ListItems from './components/list-items.js'
import AddItem from './components/add-item.js'

const TODOS_FOLDER = '/todos'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
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
    this.state.todos.forEach(todo => {
      if (todo.status === 'edit') {
        this.updateStatus(todo._id,'open')
        this.api.put(todo)
      }
    })
  }
  sortTodos = (sortedList) => {
    sortedList.forEach(item => console.dir(item.content.props.todoItem.title))
    console.log('=================')
    // here's what I have to do:
  }
  componentDidMount = () => {
    this.api.get(data => this.setState({todos: data}))
  }
  // DB Events:
  api = {
    post(newTodo, callback) {
      fetch(TODOS_FOLDER, {
          method: 'POST',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify(newTodo)
        })
        .then(res => res.json())
        .then(data => callback(data))
        .catch(error => console.log('Request failed', error));
    },
    get(callback) {
      fetch(TODOS_FOLDER)
        .then(res => res.json())
        .then(data => callback(data))
        .catch(error => console.log('Request failed', error))
    },
    put(todo) {
      fetch(`${TODOS_FOLDER}/${todo._id}`, {
          method: 'PUT',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({title: todo.title, status: todo.status})
        })
        .then(res => res.json())
        .catch(error => console.log('Request failed', error));
    },
    delete(dbId) {
      fetch(`${TODOS_FOLDER}/${dbId}`, { method: 'DELETE' })
        .then(res => res.json())
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
          sortTodos={this.sortTodos}
          removeAllEditStatus={this.removeAllEditStatus}
        />
        <AddItem
          addTodo={this.addTodo}
        />
      </div>
    )
  }
}

export default App;
