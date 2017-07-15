import React from 'react'
import DragSortableList from 'react-drag-sortable'
import DisplayEditItem from './display-edit-item.js'

const listItems = ({ todos, updateStatus, updateTitle, deleteTodo, sortTodos, removeAllEditStatus}) => {
  if (!todos) return <div>Loading...</div>
  let todoItems = todos.map( todoItem => {
    return (
      {content: (<DisplayEditItem
        key={todoItem._id}
        todoItem={todoItem}
        updateStatus={updateStatus}
        updateTitle={updateTitle}
        deleteTodo={deleteTodo}
        removeAllEditStatus={removeAllEditStatus}
      />), classes:['list-group-item']}
    )
  })
  return (
    <DragSortableList
      items={todoItems}
      onSort={sortTodos}
      placeholder={<div className="placeholderContent">move here</div>}
      dropBackTransitionDuration={0.3}
      type="vertical"
    />
  )
}

export default listItems
