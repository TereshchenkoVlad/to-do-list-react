import React, { useState } from 'react'
import TodoList from './Todo/TodoList'
import Context from './context'
import AddTodo from './Todo/AddTodo'

function App() {

  const [todos, setTodos] = useState([
    {_id: 1, title: 'Buy hairsoap', completed: false},
    {_id: 2, title: 'Buy brad', completed: false},
    {_id: 3, title: 'Buy tothbrash', completed: false}
  ])

  const onToggle = _id => {
    setTodos(
      todos.map(todo => {
        if (todo._id === _id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

  const removeTodo = _id => {
    setTodos(todos.filter(todo => todo._id !== _id))
  }

  const createTodo = value => {
    setTodos(
      todos.concat({
        _id: Date.now(),
        title: value,
        completed: false
      }),
    )
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className='wrapper'>
        <h1>ToDo List</h1>
        <div className='todo__add'>
          <AddTodo onCreate={createTodo} />
        </div>
        {
          todos.length 
          ?
          <TodoList todos={todos} onToggle={onToggle} />
          :
          "You dont have any to do yet!"
        }
      </div>
    </Context.Provider>
  );
}

export default App
