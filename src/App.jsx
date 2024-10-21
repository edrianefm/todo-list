import { useState } from 'react'
import { MdDelete } from "react-icons/md";
import './App.css'

function App() {
  const [items, setItems] = useState([]);

  // Function to toggle the completed status of a task
  const toggleTaskCompletion = (index) => {
    setItems((prevItems) => {
      const newItems = prevItems.map((item, i) => {
        if (i === index) {
          return { ...item, completed: !item.completed };
        }
        return item;
      });
      return newItems;
    });
  };

  // Function to add a new task
  const addTask = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const newTask = e.currentTarget.todo.value; // Get the value of the input
    if (newTask.trim()) { // Check if the input is not empty
      setItems((prevItems) => [...prevItems, { text: newTask, completed: false }]); // Add task object with completed status
      e.currentTarget.reset(); // Clear the input field
    }
  };

   // Function to delete a task
   const deleteTask = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };


  return (
    <div className='bg-[#e3e9ff] h-screen w-full flex justify-center flex-col gap-6 items-center'>
      <div className='bg-[#af7eeb] h-[70px] w-[320px] md:w-[640px] shadow-lg flex justify-center items-center'>
        <h1 className='text-white font-semibold text-xl tracking-widest'>To-do List</h1>
      </div>
      <div className='bg-[#ffffff] w-[320px] md:w-[640px] h-[300px] top-10 mx-auto flex flex-col justify-center items-center shadow-lg overflow-y-auto'>
        <ul className='w-full h-[300px]'>
          {items.map((item, index) => (
            <li key={index} className='text-[#979eb1] text-2xl leading-loose flex justify-between items-center p-2 mx-5 group'>
               <div className='flex items-start flex-1'>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTaskCompletion(index)}
                  className='mr-2 mt-5'
                />
                <span className={`${item.completed ? 'line-through' : ''} max-w-[200px] md:max-w-[400px] overflow-wrap break-words`}>
                  {item.text}
                </span>
              </div>
              {/* Delete Button */}
              <MdDelete  onClick={() => deleteTask(index)} className='ml-2 min-w-[30px] opacity-0 hover:cursor-pointer group-hover:opacity-100 transition-opacity duration-300'/>
            </li>
          ))}
        </ul>
      </div>

      <form className='flex flex-row gap-3' onSubmit={addTask}>
        <input className="block w-56 md:w-[25rem] md:text-xl rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800" type="text" name='todo' placeholder='Add new task....'/>
        <button  className="group cursor-pointer outline-none hover:rotate-90 duration-300" type='submit'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            className="stroke-[#979eb1] hover:stroke-white fill-none group-hover:fill-[#af7eeb] group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
          >
            <path
              d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
              stroke-width="1.5"
            ></path>
            <path d="M8 12H16" stroke-width="1.5"></path>
            <path d="M12 16V8" stroke-width="1.5"></path>
          </svg>
        </button>
      </form>

    </div>
  )
}

export default App
