import { Component } from "react";
import TodoItem from "../TodoItem";
import "./index.css";

const initialTodosList = [
  {
    id: 1,
    title: "Book the ticket for today evening",
  },
  {
    id: 2,
    title: "Rent the movie for tomorrow movie night",
  },
  {
    id: 3,
    title: "Confirm the slot for the yoga session tomorrow morning",
  },
  {
    id: 4,
    title: "Drop the parcel at Bloomingdale",
  },
  {
    id: 5,
    title: "Order fruits on Big Basket",
  },
  {
    id: 6,
    title: "Fix the production issue",
  },
  {
    id: 7,
    title: "Confirm my slot for Saturday Night",
  },
  {
    id: 8,
    title: "Get essentials for Sunday car wash",
  },
];

// Write your code here

class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList,
    inputValue: "",
    editTodoId: null,
  };

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleAddTodo = () => {
    const { inputValue } = this.state;

    if (inputValue.trim() !== "") {
      let title = inputValue;
      let numToAdd = 1;

      // Check if inputValue contains a number at the end
      const matches = inputValue.match(/^(.*)\s+(\d+)$/);
      if (matches && matches.length === 3) {
        title = matches[1]; // Extract title
        numToAdd = parseInt(matches[2], 10); // Extract number of todos
      }

      if (numToAdd > 0) {
        const { todosList } = this.state;
        const newTodos = Array.from({ length: numToAdd }, (_, index) => ({
          id: Date.now() + index,
          title,
          completed: false,
        }));

        this.setState((prevState) => ({
          todosList: [...prevState.todosList, ...newTodos],
          inputValue: "",
        }));
      }
    }
  };

  handleEditTodo = (id) => {
    this.setState({ editTodoId: id });
  };

  handleSaveTodo = (id, updatedTitle) => {
    const { todosList } = this.state;
    const updatedTodosList = todosList.map((todo) =>
      todo.id === id ? { ...todo, title: updatedTitle } : todo
    );

    this.setState({
      todosList: updatedTodosList,
      editTodoId: null,
    });
  };

  handleCheckboxToggle = (id) => {
    const { todosList } = this.state;
    const updatedTodosList = todosList.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    this.setState({
      todosList: updatedTodosList,
    });
  };

  deleteTodo = (id) => {
    const { todosList } = this.state;
    const updatedTodosList = todosList.filter((eachTodo) => eachTodo.id !== id);

    this.setState({
      todosList: updatedTodosList,
    });
  };

  render() {
    const { todosList, inputValue, editTodoId } = this.state;

    return (
      <div className="app-container">
        <div className="simple-todos-container">
          <h1 className="heading">Simple Todos</h1>
          <div className="add-todo-container">
            <input
              type="text"
              value={inputValue}
              onChange={this.handleInputChange}
              placeholder="Enter todo"
            />
            <button onClick={this.handleAddTodo}>Add</button>
          </div>

          <ul className="todos-list">
            {todosList.map((eachTodo) => (
              <li key={eachTodo.id} className="todo-item">
                <input
                  type="checkbox"
                  checked={eachTodo.completed}
                  onChange={() => this.handleCheckboxToggle(eachTodo.id)}
                />
                {editTodoId === eachTodo.id ? (
                  <input
                    type="text"
                    value={eachTodo.title}
                    onChange={(e) =>
                      this.handleSaveTodo(eachTodo.id, e.target.value)
                    }
                  />
                ) : (
                  <p
                    className={eachTodo.completed ? "completed-title" : "title"}
                  >
                    {eachTodo.title}
                  </p>
                )}
                <button onClick={() => this.handleEditTodo(eachTodo.id)}>
                  {editTodoId === eachTodo.id ? "Save" : "Edit"}
                </button>
                <button onClick={() => this.deleteTodo(eachTodo.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default SimpleTodos;