import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import { arrayMove } from 'react-sortable-hoc'

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
      order: -1
    }
    const tempId = Math.random().toString(36).substring(7)

    // call the api BEFORE giving it a temp ID
    this.api.create(newTodo, data => {
      // buy the time we're in callback, we've got a new ID to replace the temp
      const todoToUpdate = this.state.todos.find(todo => todo._id === tempId)
      todoToUpdate._id = data._id
      this.setState({todos: this.state.todos})

      // now we force one more call to make the order nice and perfect:
      this.sortTodos({oldIndex:0, newIndex:0})
    })
    // give it a temp ID
    newTodo._id = tempId
    let todos = this.state.todos
    todos.push(newTodo)
    this.setState({todos})
  }
  updateStatus = (_id, status) => {
    const todoToUpdate = this.state.todos.find(todo => todo._id === _id)
    todoToUpdate.status = status
    this.setState({todos: this.state.todos})
    this.api.update({_id, status})
  }
  updateTitle = (_id, title) => {
    const todoToUpdate = this.state.todos.find(todo => todo._id === _id)
    todoToUpdate.title = title
    todoToUpdate.status = 'open'
    this.setState({todos: this.state.todos})
    this.api.update({_id, title, status:'open'})
  }
  enableEdit = (_id, shouldEnable) => {
    const todoToEdit = this.state.todos.find(todo => todo._id === _id)
    todoToEdit.status = shouldEnable ? 'edit' : 'open'
    this.setState({todos: this.state.todos})
  }
  deleteTodo = (_id) => {
    const todos = this.state.todos.filter(todo => todo._id !== _id)
    this.setState({todos})
    this.api.delete(_id)
  }
  removeAllEditStatus = () => {
    const todos = this.state.todos.map(todo => {
      if (todo.status === 'edit') todo.status = 'open'
      return todo
    })
    this.setState({todos})
  }
  sortTodos = ({oldIndex, newIndex}) => {
    // we have a special todos array with the minimum for patching:
    const todosToPatch = []
    const todos = arrayMove(this.state.todos, oldIndex, newIndex)
      .map((todoItem, order) => {
        todoItem.order = order
        todosToPatch.push({order, _id: todoItem._id})
        return todoItem
      })
    this.api.batchUpdate(todosToPatch)
    this.setState({todos})
  }
  componentDidMount = () => {
    this.api.list(data => this.setState({todos: data}))
  }
  // DB Events:
  api = {
    create(newTodo, callback) {
      fetch(TODOS_FOLDER, {
          method: 'POST',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify(newTodo)
        })
        .then(res => res.json())
        .then(data => callback(data))
        .catch(error => console.log('Request failed', error));
    },
    list(callback) {
      fetch(TODOS_FOLDER)
        .then(res => res.json())
        .then(data => callback(data))
        .catch(error => console.log('Request failed', error))
    },
    update(todo) {
      const {_id} = todo
      fetch(`${TODOS_FOLDER}/${_id}`, {
          method: 'PATCH',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify(todo)
        })
        .then(res => res.json())
        .catch(error => console.log('Request failed', error));
    },
    batchUpdate(todos) {
      fetch(`${TODOS_FOLDER}/`, {
          method: 'PATCH',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify(todos)
        })
        .then(res => res.json())
        .catch(error => console.log('Request failed', error));
    },
    delete(_id) {
      fetch(`${TODOS_FOLDER}/${_id}`, { method: 'DELETE' })
        .then(res => res.json())
        .catch(error => console.log('Request failed', error));
    }
  }
  render() {
    return (
      <div>
        <h1>Eric's React To Do App</h1>
        <AddItem
          addTodo={this.addTodo}
        />
        <ListItems
          todos={this.state.todos}
          updateStatus={this.updateStatus}
          updateTitle={this.updateTitle}
          deleteTodo={this.deleteTodo}
          enableEdit={this.enableEdit}
          sortTodos={this.sortTodos}
          removeAllEditStatus={this.removeAllEditStatus}
        />
      </div>
    )
  }
}

export default App;
