import React from 'react'
import DisplayEditItem from './display-edit-item.js'

const listItems = ({ todos, updateStatus, updateTitle, deleteTodo, removeAllEditStatus}) => {
  if (!todos) return <div>Loading...</div>
  const todoItems = todos.map( todoItem => {
    return (
      <DisplayEditItem
        key={todoItem._id}
        todoItem={todoItem}

        updateStatus={updateStatus}
        updateTitle={updateTitle}
        deleteTodo={deleteTodo}
        removeAllEditStatus={removeAllEditStatus}
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