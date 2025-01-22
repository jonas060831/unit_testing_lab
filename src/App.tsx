import { ChangeEvent, MouseEvent, useState } from 'react'
import './App.css'




const App = () => {
  const [todos, setTodo] = useState<string[] | []>(['Laundry'])
  const [inputValue, setInputValue] = useState<string>('')
  

  const handleAddTodo = (event: MouseEvent<HTMLButtonElement>) :void => {

    const todoList = [...todos, inputValue]
    event.preventDefault()
    setTodo(todoList)
    setInputValue('')
    console.log(todoList)
  }


  const deleteTodo = (todoToBeDeleted: string) :void => {

    const updatedTodos = todos.filter((todo: string) => todo != todoToBeDeleted)

    setTodo(updatedTodos)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) :void => {
    setInputValue(event.target.value)
  }

  return (
    <div>
        {/* i wanted to test the existence of a header with a value of Todo */}
        <h1>Todo List</h1>


        {/* i wanted to check if there is a input text that existing
        and if it have a name of todo-input-text */}
        <label>
          Task:
          <input
          type="text"
          name='todo-input-text'
          placeholder='e.g Laundry, Exercise'
          value={inputValue}
          onChange={handleChange}
          />
        </label>
        <br />
        <button
         onClick={handleAddTodo}
         >
          Add
        </button>
        <br />
        {
          todos.length === 0 ? (
            <>No todo yet!</>
          ) : (
            <div>
              <ul>

                {
                  todos.map((todo :string, index: number) => (
                    <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center', width: '300px' }}>
                      
                      <li
                      data-testid='record' //need this for testing do not forget
                      >
                        {todo}
                      </li>

                      <button onClick={() => deleteTodo(todo)}>DELETE</button>
                    </div>
                  ))
                }
              </ul>
            </div>
          )
        }
    </div>
  )
}

export default App
