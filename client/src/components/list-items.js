import React from 'react'
// import DragSortableList from 'react-drag-sortable'
import DisplayEditItem from './display-edit-item.js'

import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc'

const DragHandle = SortableHandle(() => {
 return (
  <div className="list-group-item__drag drag">
    <span className="drag__item"></span>
    <span className="drag__item"></span>
    <span className="drag__item"></span>
  </div>
  )
})

const SortableItem = SortableElement(({value}) =>
  <li className="list-group-item">
    <DragHandle />
    {value}
  </li>
)
const SortableList = SortableContainer(({items}) => {
  return (
    <ul className="list-group">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  )
})

const listItems = ({ todos, updateStatus, updateTitle, deleteTodo, sortTodos, removeAllEditStatus}) => {
  if (!todos) return <div>Loading...</div>
  todos.sort( (a,b) => a.order - b.order)
  let todoItems = todos.map( todoItem => {
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
  return <SortableList items={todoItems} lockAxis="y" useDragHandle={true} onSortEnd={sortTodos} />;
}

export default listItems