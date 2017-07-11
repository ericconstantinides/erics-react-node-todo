import React, { Component } from 'react'

class displayEditItem extends Component {
  constructor(props) {
    super(props);
  }
  handleDelete = () => {
    this.props.deleteTodo(this.props.todoItem._id)
  }
  handleEdit = () => {

  }

  handleComplete = () => {
    let status = this.props.todoItem.status === 'complete' ? 'open' : 'complete'
    this.props.updateStatus(this.props.todoItem._id, status)
  }
  render() {

    console.log()

    let button = this.props.todoItem.status === 'complete' ?
    <button className="btn btn-sm btn-danger" onClick={this.handleDelete} data-todo="delete">Delete</button> :
    <button className="btn btn-sm btn-default" onClick={this.handleEdit} data-todo="edit">Edit</button>

    let status = this.props.todoItem.status === 'complete' ? 'list-group-item is-complete' : 'list-group-item'
    let checked = this.props.todoItem.status === 'complete' ? 'checked' : ''

    if (this.props.todoItem.status === 'open' || this.props.todoItem.status === 'complete') {
      return (
        <li className={status} data-todo="item" data-id={this.props.todoItem._id}>
          <label className="form-check-label" data-todo="checkmark">
            <input className="form-check-input"
              type="checkbox"
              checked={checked}
              data-todo="checkmark"
              onClick={this.handleComplete}
            />
            {this.props.todoItem.title}
          </label>
          {button}
        </li>
      )
    } else if (this.props.todoItem.status === 'edit') {
      return (
        <li className="list-group-item edit" data-todo="item-edit">
          <input className="form-control" data-todo="edit-item" type="text" value="${item.title}" />
          <button className="btn btn-sm btn-default" data-todo="cancel">Cancel</button>
          <button className="btn btn-sm btn-success" data-todo="update">Update</button>
          <button className="btn btn-sm btn-danger" data-todo="delete">Delete</button>
        </li>
      )
    }
  }
}

export default displayEditItem



