import React, { Component } from 'react'

class displayEditItem extends Component {
  constructor(props) {
    super(props)
    this.buttons = {
      edit: <button
        className="btn btn-sm btn-default"
        onClick={this.handleEdit}
        data-todo="edit"
      >Edit</button>,
      cancel: <button
        className="btn btn-sm btn-default"
        data-todo="cancel"
        onClick={this.handleCancel}
      >Cancel</button>,
      update: <button
        className="btn btn-sm btn-success"
        data-todo="update"
        onClick={this.handleUpdate}
      >Update</button>,
      delete: <button
        className="btn btn-sm btn-danger"
        data-todo="delete"
        onClick={this.handleDelete}
      >Delete</button>
    }
  }
  handleDelete = () => {
    this.props.deleteTodo(this.props.todoItem._id)
  }
  handleEdit = () => {
    this.props.removeAllEditStatus()
    this.props.updateStatus(this.props.todoItem._id, 'edit')
  }
  handleComplete = () => {
    let status = this.props.todoItem.status === 'complete' ? 'open' : 'complete'
    this.props.updateStatus(this.props.todoItem._id, status)
  }
  handleCancel = () => {
    this.props.updateStatus(this.props.todoItem._id, 'open')
  }
  handleUpdate = () => {
    if (this.refs.editTodo.value) {
      this.props.updateTitle(this.props.todoItem._id, this.refs.editTodo.value)
    }
  }
  handleEscape = (event) => {
    if (event.keyCode === 27) {
      this.props.updateStatus(this.props.todoItem._id, 'open')
    }
  }
  handleEnter = (event) => {
    if (event.keyCode === 13) {
      this.handleUpdate()
    }
  }
  // componentWillMount = () => {
    // this.props.removeAllEditStatus()
  // }
  componentDidUpdate = (event) => {
    if (this.props.todoItem.status === 'edit') {
      this.refs.editTodo.focus()
    }
  }
  render() {
    if (this.props.todoItem.status !== 'edit') {
      return (
        <div
          data-todo={this.props.todoItem.status === 'complete' ? 'item-complete' : 'item'}>
          <label className="form-check-label" data-todo="checkmark">
            <input className="form-check-input"
              type="checkbox"
              checked={this.props.todoItem.status === 'complete' ? 'checked' : ''}
              data-todo="checkmark"
              onChange={this.handleComplete}
            />
            {this.props.todoItem.title}
          </label>
          {this.props.todoItem.status === 'open' ? this.buttons.edit : this.buttons.delete}
        </div>
      )
    } else {
      return (
        <div className="edit" data-todo="item-edit">
          <input
            className="form-control"
            data-todo="edit-item"
            ref="editTodo"
            type="text"
            onKeyUp={this.handleEscape}
            onKeyDown={this.handleEnter}
            defaultValue={this.props.todoItem.title}
          />
          {this.buttons.cancel}
          {this.buttons.update}
          {this.buttons.delete}
        </div>
      )
    }
  }
}

export default displayEditItem
