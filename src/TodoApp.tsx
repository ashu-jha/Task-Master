import React, { useState } from 'react';
import { Trash2, CheckCircle2, Plus } from 'lucide-react';

const TodoApp = () => {
  const [todos, setTodos] = useState<Array<{ id: number; text: string; completed: boolean }>>([]);
  const [inputValue, setInputValue] = useState('');

  // Add a new todo
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([
        ...todos, 
        { 
          id: Date.now(), 
          text: inputValue.trim(), 
          completed: false 
        }
      ]);
      setInputValue('');
    }
  };

  // Toggle todo completion
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed } 
        : todo
    ));
  };

  // Delete a todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Handle input key press (allow Enter to add todo)
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 p-4 sm:p-6 md:p-8">
      <div className="bg-white rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-indigo-600">TaskMaster</h1>
        
        <div className="flex mb-6 group">
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="What needs to be done?"
            className="flex-grow p-2 sm:p-3 border-2 border-r-0 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 group-hover:border-indigo-300"
          />
          <button 
            onClick={addTodo}
            className="bg-indigo-500 text-white px-4 sm:px-6 rounded-r-lg hover:bg-indigo-600 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg whitespace-nowrap"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>

        {todos.length === 0 && (
          <div className="text-center py-6 sm:py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed">
            <p className="mb-2">Your task list is empty</p>
            <p className="text-sm">Add your first task to get started</p>
          </div>
        )}

        <ul className="space-y-2">
          {todos.map(todo => (
            <li 
              key={todo.id} 
              className={`
                flex items-center justify-between p-3 sm:p-4 rounded-lg transition-all duration-300 transform hover:scale-[1.01]
                ${todo.completed 
                  ? 'bg-green-50 border border-green-100' 
                  : 'bg-white border hover:border-blue-200 hover:shadow-md'}
              `}
            >
              <span 
                onClick={() => toggleTodo(todo.id)}
                className={`
                  flex-grow cursor-pointer transition-all duration-200 text-sm sm:text-base
                  ${todo.completed 
                    ? 'line-through text-gray-500' 
                    : 'text-gray-700 hover:text-indigo-600'}
                `}
              >
                {todo.text}
              </span>
              
              <div className="flex items-center space-x-2 sm:space-x-3">
                <button 
                  onClick={() => toggleTodo(todo.id)}
                  className={`
                    p-1.5 sm:p-2 rounded-full transition-all duration-200
                    ${todo.completed 
                      ? 'text-green-500 bg-green-100 hover:bg-green-200' 
                      : 'text-gray-400 hover:bg-indigo-100 hover:text-indigo-600'}
                  `}
                >
                  <CheckCircle2 size={18} />
                </button>
                
                <button 
                  onClick={() => deleteTodo(todo.id)}
                  className="text-gray-400 hover:text-red-500 hover:bg-red-100 p-1.5 sm:p-2 rounded-full transition-all duration-200"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {todos.length > 0 && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-indigo-50 rounded-lg text-center">
            <div className="text-indigo-600 space-x-4 text-sm sm:text-base">
              <span>Tasks: {todos.length}</span>
              <span>•</span>
              <span>Done: {todos.filter(todo => todo.completed).length}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
