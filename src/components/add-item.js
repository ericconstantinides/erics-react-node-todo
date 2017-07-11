import React, { Component } from 'react'

class AddItem extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  handleAdd = () => {
    if (this.refs.addNewTodo.value) {
      this.props.addTodo(this.refs.addNewTodo.value)
      this.refs.addNewTodo.value = ''
    }
  }
  handleEnter = (event) => {
    if (event.keyCode === 13) {
      this.handleAdd()
    }
  }
  render() {
    return (
      <div className="add-container">
        <input className="form-control" placeholder="Enter a new todo item" ref="addNewTodo" data-todo="add-item" type="text" onKeyDown={this.handleEnter} />
        <button className="btn btn-sm btn-primary" data-todo="add" value="add" onClick={this.handleAdd} >Add</button>
      </div>
    )
  }
}

export default AddItem