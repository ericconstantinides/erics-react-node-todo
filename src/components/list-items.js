import React from 'react'
import DisplayEditItem from './display-edit-item.js'

const listItems = ({ todos, completeTodo, updateStatus, deleteTodo}) => {
  if (!todos) return <div>Loading...</div>
  const todoItems = todos.map( todoItem => {
    return (
      <DisplayEditItem
        key={todoItem._id}
        todoItem={todoItem}

        completeTodo={completeTodo}
        updateStatus={updateStatus}
        deleteTodo={deleteTodo}
      />
    )
  })
  return (
    <ul className="list-group" data-todo="list">
      {todoItems}
    </ul>
  )
}

export default listItems