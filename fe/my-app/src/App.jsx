import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const input = useRef()
  const [localTodos, setLocalTodos] = useState(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [])  // null -> []

  // component did mount
  useEffect(()=>{
    axios.get('/api/getTodos').then((res) => {
      const data = res.data
      setLocalTodos(data)
    }).catch((err) => {
      window.alert('获取后台数据失败')
    })
  }, [])

  // state update
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(localTodos))
  }, [localTodos])

  // enter
  const addTodo = (event) => {
    event.preventDefault()
    const inputVal = input.current.value

    // check in fontend, input can not be empty
    if (inputVal) {
      const todoObj = {
        'id': generateId(),
        'text': inputVal,
        'finished': false
      }
      // post to backend
      axios.post('/api/addTodo', todoObj).then((res) => {

        // request from backend
        if (res.status === 200) {
          // update localStorage & page
          setLocalTodos(
            [
              ...localTodos,
              todoObj
            ]
          )
        } else {
          throw new Error(res)
        }
      }).catch((err) => {
        throw new Error(err)
      })

      // clear input
      input.current.value = ''
    } else {
      window.alert('invalid input!')
    }
  }

  // left click
  const finishTodo = (todoItem) => {
    const todoObj = {
      id: todoItem.id,
      finished: !todoItem.finished
    }

    // post to backend
    axios.post('/api/finishTodo', todoObj).then((res) => {

      // request from backend
      if (res.status === 200) {
        // update localStorage & page
        setLocalTodos(localTodos.map(localItem => {
          if (localItem.id === todoItem.id) localItem.finished = !localItem.finished
          return localItem
        }))
      } else {
        throw new Error(res)
      }
    }).catch((err) => {
      throw new Error(err)
    })

    
  }

  // right click
  const delTodo = (event, id) => {
    event.preventDefault()
    const todoObj = { id }

    axios.delete('/api/delTodo', { data: todoObj}).then((res) => {

      // request from backend
      if (res.status === 200) {
        // update localStorage & page
        setLocalTodos(localTodos.filter(item => item.id !== id))
      } else {
        throw new Error(res)
      }
    }).catch((err) => {
      throw new Error(err)
    })
    
  }
  
  // generate random id which consisted of lowercase & uppercase & number
  const generateId = () => {
    return Date.now()%10000000 + String.fromCharCode(Math.floor(Math.random() * 26) + 97) + String.fromCharCode(Math.floor(Math.random() * 26) + 65)
  }

  return (
    <div className="App">
      <h1>todos</h1>
        <form id="form" onSubmit = {e => addTodo(e)}>
          <input id="input" ref={input} type="text" placeholder="Enter your todo" />
          <ul id="todos">
            {
              localTodos.map(item => {
                return (
                  <li 
                  className = {item.finished ? "todo finished" : "todo"} 
                  key = {item.id}
                  onClick = {() => finishTodo(item)}
                  onContextMenu = {e => delTodo(e, item.id)}>{item.text}</li>
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
