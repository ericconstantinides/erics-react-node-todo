import React, { Component } from 'react'

class AddItem extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  handleAdd = () => {
    this.props.addTodo(this.refs.monkey.value)
    this.refs.monkey.value = ''
  }
  render() {
    return (
      <div className="add-container">
        <input className="form-control" placeholder="Enter a new todo item" ref="monkey" data-todo="add-item" type="text" />
        <button className="btn btn-sm btn-primary" data-todo="add" value="add" onClick={this.handleAdd}>Add</button>
      </div>
    )
  }
}

export default AddItem