import { useState, useRef } from 'react';
import axios from 'axios';
import Notification from './Notification';
import IconFont from "./iconFont";
import './App.css';

// set 'api1' for egg.js || set 'api2' for spring boot
const useApi = 'api1'

function App() {
  const input = useRef()
  const [localTodos, setLocalTodos] = useState([])  
  const [clickFreeze, setClickFreeze] = useState(false)
  const [notification, setNotification] = useState([])

  // click refresh
  const getTodos = () => {
    axios.get(`/${useApi}/getTodos`).then((res) => {
      const data = res.data
      console.log(`data from ${useApi}`, data)
      setLocalTodos(data)
      setNotification([
        ...notification,
        {
          id: generateId(),
          type: 'success',
          message: '获取后台数据成功'
        }
      ])
    }).catch((err) => {
      console.log(err)
      setNotification([
        ...notification,
        {
          id: generateId(),
          type: 'error',
          message: '获取后台数据失败'
        }
      ])
    })
  }

  // enter
  const addTodo = (event) => {
    event.preventDefault()
    const inputVal = input.current.value

    // check in fontend, input can not be empty
    if (inputVal) {
      const todoObj = {
        'id': generateId().toString(),
        'text': inputVal.toString(),
        'finished': false
      }
      // post to backend
      axios.post(`/${useApi}/addTodo`, {
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify(todoObj)
      }).then((res) => {

        // request from backend
        if (res.status === 200) {
          // update  page
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
    axios.post(`/${useApi}/finishTodo`, {
      headers: {'Content-Type': 'application/json'},
      data: JSON.stringify(todoObj)
    }).then((res) => {

      // request from backend
      if (res.status === 200) {
        // update page
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
    if (clickFreeze) {
      window.alert('click freezing')
    } else {
      // freeze click
      setClickFreeze(true)
      setTimeout(() => {
        // thaw click
        setClickFreeze(false)
      }, 500);

      const todoObj = { id }

      axios.post(`/${useApi}/delTodo`, { 
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify(todoObj)
      }).then((res) => {
  
        // request from backend
        if (res.status === 200) {
          // update page
          setLocalTodos(localTodos.filter(item => item.id !== id))
        } else {
          throw new Error(res)
        }
      }).catch((err) => {
        throw new Error(err)
      })
    }
    
    
  }
  
  // generate random id which consisted of lowercase & uppercase & number
  const generateId = () => {
    return Date.now()%10000000 + String.fromCharCode(Math.floor(Math.random() * 26) + 97) + String.fromCharCode(Math.floor(Math.random() * 26) + 65)
  }


  return (
    <div className="App">
      <h1>todos</h1>
      <button onClick={getTodos}><IconFont type={"icon-shuaxin"}/></button>
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
        Left click to finish one todo
        <br/>
        Right click to delete
      </small>
      <div className="notification-container">
        {
          notification.map(oneNote => <Notification oneNote={oneNote} key={oneNote.id}/>)
        }
      </div>
    </div>
  );
}

export default App;
