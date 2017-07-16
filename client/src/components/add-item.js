import React, { Component } from 'react'

class AddItem extends Component {
  handleSubmit = event => {
    event.preventDefault()
    if (this.refs.addNewTodo.value) {
      this.props.addTodo(this.refs.addNewTodo.value)
      this.refs.addNewTodo.value = ''
    }
  }
  render() {
    return (
      <form className="add-container" onSubmit={this.handleSubmit}>
        <input
          className="form-control"
          placeholder="Enter a new todo item"
          ref="addNewTodo"
          data-todo="add-item"
          type="text"
          onKeyDown={this.handleEnter}
        />
        <button
          className="btn btn-sm btn-primary"
          data-todo="add"
          type="submit"
        >Add</button>
      </form>
    )
  }
}

export default AddItem
