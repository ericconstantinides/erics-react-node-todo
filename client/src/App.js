// import React, { Component } from 'react';
// import logo from './logo.svg';
import './css/bootstrap.min.css';
import './css/bootstrap-theme.min.css';
import './App.css';

import React, { Component } from 'react'
// import ReactDOM from 'react-dom'

import ListItems from './components/list-items.js'
import AddItem from './components/add-item.js'

const tempTodos =[
  {
      "_id" : "594382b3a210b05693bfd06b",
      "title" : "integrate a Webpack build",
      "status" : "open",
      "__v" : 0
  },{
      "_id" : "594382bba210b05693bfd06c",
      "title" : "Function out the front-end more",
      "status" : "open",
      "__v" : 0
  },{
      "_id" : "594382c2a210b05693bfd06d",
      "title" : "add a readme.md",
      "status" : "open",
      "__v" : 0
  },{
      "_id" : "594382c8a210b05693bfd06e",
      "title" : "Make this work on a server",
      "status" : "open",
      "__v" : 0
  },{
      "_id" : "594382d1a210b05693bfd06f",
      "title" : "Make it work on a per-user basis",
      "status" : "open",
      "__v" : 0
  },{
      "_id" : "594382dca210b05693bfd070",
      "title" : "Add a better fetch with promises",
      "status" : "complete",
      "__v" : 0
  },{
      "_id" : "59438a21a210b05693bfd071",
      "title" : "Convert this into React",
      "status" : "open",
      "__v" : 0
  },{
      "_id" : "59438f74a210b05693bfd073",
      "title" : "I could have a collection which has an ordered array of todo _ids",
      "status" : "open",
      "__v" : 0
  },{
      "_id" : "59611e18b5963993a95fd869",
      "title" : "move this into a new repo for React",
      "status" : "open",
      "__v" : 0
  },{
      "_id" : "59648e3a70ddb90c59b859cb",
      "title" : "Add a sort to this",
      "status" : "open",
      "__v" : 0
  }
]

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
    const todos = this.state.todos.map(todo => {
      if (todo.status === 'edit') {
        todo.status = 'open'
        this.api.put(todo)
      }
      return todo
    })
    this.setState({todos})
  }
  componentDidMount = () => {
    // this.api.get(data => this.setState({todos: data}))
    this.setState({todos: tempTodos})
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
