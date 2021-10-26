import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const input = useRef()
  const [localTodos, setLocalTodos] = useState(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [])  // null -> []

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(localTodos))
  }, [localTodos])

  const addTodo = (event) => {
    event.preventDefault()

    // input can not be empty
    if (input.current.value) {
      // update localStorage & page
      setLocalTodos(
        [
          ...localTodos,
          {
            'text': input.current.value,
            'finished': false
          }
        ]
      )

      // clear input
      input.current.value = ''
    } else {
      window.alert('invalid input!')
    }
  }

  const finishTodo = (event, idx) => {
    event.target.className = localTodos[idx].finished
    setLocalTodos(localTodos.map((item, id) => {
      if (id === idx) item.finished = !item.finished
      return item
    }))
  }

  const delTodo = (event, idx) => {
    event.preventDefault()
    setLocalTodos(localTodos.filter((_, id) => id !== idx))
  }
  

  return (
    <div className="App">
      <h1>todos</h1>
        <form id="form" onSubmit = {e => addTodo(e)}>
          <input id="input" ref={input} type="text" placeholder="Enter your todo" />
          <ul id="todos">
            {
              localTodos.map((item, idx) => {
                return (
                  <li 
                  className = {item.finished ? "todo finished" : "todo"} 
                  key = {idx}
                  onClick = {(e) => finishTodo(e, idx)}
                  onContextMenu = {e => delTodo(e, idx)}>{item.text}</li>
                )
              })
            }
          </ul>
        </form>
        <small>
          Left click if finished dotos
          <br/>
          Right click to delete
        </small>
    </div>
  );
}

export default App;
