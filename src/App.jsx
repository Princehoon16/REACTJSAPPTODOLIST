import React, { useState , useEffect } from "react";
import Navbar from "./components/Navbar";
import { RiEdit2Fill } from "react-icons/ri";
import { MdAutoDelete } from "react-icons/md";

import { v4 as uuidv4 } from "uuid";


const App = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [alert, setAlert] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); // State to track edit mode
  const [editId, setEditId] = useState(null); // State to track the id of todo being edited
  const [setIsAdding] = useState(true);

  const [showFinished,setshowFinished] = useState(true);

  const [todosLoaded, setTodosLoaded] = useState(false);


  // useEffect(()=>{
  //   let todoString = localStorage.getItem("todos")
  //   if(todoString){
  //     let todos = JSON.parse(localStorage.getItem("todos"))
  //   setTodos(todos)
  //   }
    
  // },[])

  // useEffect(() => {
  //   let todoString = localStorage.getItem("todos");
  //   if (todoString) {
  //     let parsedTodos = JSON.parse(todoString);
  //     setTodos(parsedTodos);
  //   }
  // }, []);


  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString && !todosLoaded) {
      const parsedTodos = JSON.parse(todoString);
      setTodos(parsedTodos);
      setTodosLoaded(true);
    }
  }, [todosLoaded]);
  
  


const saveTols = () => {
  // localStorage.setItem("todos",JSON.stringify(todos));

  try {
    localStorage.setItem("todos", JSON.stringify(todos));
  } catch (error) {
    console.error("Error saving todos to localStorage:", error);
  }
  
}

const toggleFinished = (e) => {
  setshowFinished(!showFinished)
}



  const confirmDelete = () => {
    const newTodos = todos.filter((item) => item.id !== confirmDeleteId);
    setTodos(newTodos);
    setConfirmDeleteId(null);
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const handleEdit = (id) => {
  
  const todoToEdit = todos.find((item) => item.id === id);
  
  if (todoToEdit) {
    // Set the todo state to the text of the todo item
    setTodo(todoToEdit.todo);
    setIsEditMode(true); // Set edit mode to true
    setEditId(id); 
    setIsAdding(false);
    saveTols()
  }

   
  };

  // const handleAdd = () => {
  //   setIsAdding(true);
  //   setTodo("");
  // };

  const handleDelete = (id) => {
    // console.log(`the id is ${id}`)

    // let newTodos = todos.filter(item=>{
    //  return item.id!==id
    // });
    // setTodos(newTodos)

    setConfirmDeleteId(id);
    saveTols()

    // console.log("confirmDeleteId:", id);
  };

  const handleAddOrUpdate = () => {
    if (todo.trim() === "") {
      setAlert(
        <div
          className="mb-5 bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md"
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-red-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="">You Did not Entered Nothing</p>
              <p className="text-sm">Please Entered Something it'll affect you..</p>
            </div>
          </div>
        </div>
      ); // Exit early if input is empty
      return;
    }

    if (isEditMode) {
      // Update todo
      const updatedTodos = todos.map((item) => {
        if (item.id === editId) {
          return { ...item, todo: todo };
        }
        return item;
      });
      setTodos(updatedTodos);
      setIsEditMode(false);
      setEditId(null);
    }
else{
  setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
}
    
    setTodo("");
    setAlert(null);
    saveTols();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
    saveTols();
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveTols();
    
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5  rounded-xl p-5 bg-slate-400 min-h-[80vh] md:w-[35%]">
        <h1 className="text-center font-bold text-3xl">EveryOne TaskPlanner - Manage Todos at One Place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          {alert}
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input
            onChange={handleChange}
            type="text"
            name={todo.id}
            className="w-full pl-2 rounded-full px-5 py-1"
            value={todo}
        
          />
          <button
            className="text-sm  bg-slate-800 hover:bg-slate-950 p-3 py-1 text-white rounded-md "
            onClick={handleAddOrUpdate}
          >
          {isEditMode ? "Update" : "Add"}
          </button>
        </div>
        <input className="my-4" onChange={toggleFinished}type="checkbox" checked={showFinished}/> ShowFinished
        <h2 className="text-xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos To Display</div>}
          {todos.map((item) => {
            return (showFinished || item.isCompleted) && (
              <div
                key={item.id}
                className="todo flex  my-3 justify-between"
              >
                <div className="flex gap-5">
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked ={item.isCompleted}
                    name={item.id}
                    id=""
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>

                <div className="buttons">
                  <button
                    className="text-sm  bg-slate-800 hover:bg-slate-950 p-3 py-1 text-white rounded-md mx-1"
                    onClick={() => handleEdit(item.id)}
                  >
                  <RiEdit2Fill />
                  </button>
                  <button
                    className="text-sm  bg-slate-800 hover:bg-slate-950 p-3 py-1 text-white rounded-md mx-1"
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    <MdAutoDelete />
                  </button>

                  {/* Confirmation Dialog */}
                  {confirmDeleteId && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                          className="fixed inset-0 transition-opacity"
                          aria-hidden="true"
                        >
                          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span
                          className="hidden sm:inline-block sm:align-middle sm:h-screen"
                          aria-hidden="true"
                        >
                          &#8203;
                        </span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                {/* Icon */}
                                <svg
                                  className="h-6 w-6 text-red-600 cursor-pointer"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  onClick={(e) => {
                                    cancelDelete();
                                    e.stopPropagation();
                                  }}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                  ></path>
                                </svg>
                              </div>
                              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                  Delete Todo
                                </h3>
                                <div className="mt-2">
                                  <p className="text-sm text-gray-500">
                                    Are you sure you want to delete this todo?
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                              onClick={confirmDelete}
                              type="button"
                              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                              Delete
                            </button>
                            <button
                              onClick={cancelDelete}
                              type="button"
                              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;
