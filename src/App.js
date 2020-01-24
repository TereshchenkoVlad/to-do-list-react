import React, { useState, useEffect, Suspense } from 'react'
import TodoList from './Todo/TodoList'
import Context from './context'
import Loader from './Todo/Loader' 
import Modal from './Modal/Modal'
import axios from 'axios'

const AddTodo = React.lazy(() => import('./Todo/AddTodo'))

function App() {

  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [addingTodo, setAddingTodo] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://to-do-list-212e2.firebaseio.com/todos.json')
        if (res.data) {
          const todosValues = Object.values(res.data)
          Object.keys(res.data).forEach((key, index) => todosValues[index]['id'] = key)
          setTodos(todosValues)
        }
        setLoading(loading => !loading)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

  const onToggle = id => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
    console.log(id)
  }

  const removeTodo = async id => {
    setTodos(todos.filter(todo => todo.id !== id))
    try {
      await axios.delete(`https://to-do-list-212e2.firebaseio.com/todos/${id}.json`)
    } catch (e) {
      console.log(e)
    }
  }

  const createTodo = async value => {
    setAddingTodo(true)
    try {
      const res = await axios.post('https://to-do-list-212e2.firebaseio.com/todos.json', {
            title: value,
            completed: false
      })
      setTodos(
        todos.concat({
          id: res.data.name,
          title: value,
          completed: false
        })
      )
    } catch (e) {
      console.log(e)
    }
    setAddingTodo(false)
  }

  const editTodo = async e => {
    e.target.getAttribute('data') // element ID
    e.target.removeAttribute("disabled"); // makes input enable to edit
  }

  return (
    <Context.Provider value={{ removeTodo, editTodo }}>
      <div className='wrapper'>
        <h1>ToDo List</h1>
        <Modal 
          title='Hi, your smile is the best!' 
          message='Are you smiling now? I hope yes :)' 
          buttonText='Bye'
        />
        <div className='todo__add'>
          <Suspense fallback={''}>
            <AddTodo onCreate={createTodo} />
          </Suspense>
          { loading && <Loader /> }
        </div>
        {
          todos.length 
          ?
          <TodoList todos={todos} onToggle={onToggle} />
          :
          loading ? null : "You dont have any to do yet!"
        }
        { addingTodo && <div className='todo__add'><Loader /></div> }
      </div>
    </Context.Provider>
  );
}

export default App
