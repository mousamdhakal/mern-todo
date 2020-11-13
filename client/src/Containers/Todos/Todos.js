import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ToDoList from '../TodoList/TodoList';
import AddTask from '../AddTask/AddTask';
import * as todosActions from '../../actions/todosActions';
import * as userActions from '../../actions/userActions';
import * as signActions from '../../actions/signActions';
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import {
  getAllTodo,
  addTodo,
  updateTodo,
  deleteTodo,
} from '../../services/http';

class Todos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoToEdit: null,
    };

    getAllTodo((todos) => {
      if (todos) {
        this.props.setTodos(todos);
      } else {
        setAuthorizationToken(false);
        localStorage.removeItem('jwtToken');
        this.props.removeUser();
        this.props.setSignIn({
          message: 'Unable to verify token. Please sign In to Continue',
          status: 404,
        });
        this.props.history.push('/signin');
      }
    });
  }

  onFail = (message) => {
    toast(message);
  }

  setTodoToEdit = (todo) => {
    this.setState({
      todoToEdit: todo,
    });
  };

  clearTodoToEdit = (todo) => {
    this.setState({
      todoToEdit: null,
    });
  };

  deleteTask = (id) => {
    const oldTasks = this.props.todos;
    let tasks = this.props.todos.filter((todo) => {
      return todo._id !== id;
    });
    this.props.setTodos(tasks);
    deleteTodo(id, () => {
      toast.error('Failed to delete');
      this.props.setTodos(oldTasks);
    },);
  };

  addNewTask = (text) => {
    let newTask = {
      todo: text,
      completed: false,
    };
    addTodo(newTask, (todo) => {
      this.props.setTodos([...this.props.todos, todo]);
    });
  };

  changeTaskStatus = (id) => {
    const oldTodos = this.props.todos;
    let updatedTask;
    let updatedTodos = this.props.todos.map((task) => {
      if (task._id === id) {
        task.completed = !task.completed;
        updatedTask = task;
      }
      return task;
    });
    this.props.setTodos(updatedTodos);
    updateTodo(updatedTask, () => {
      toast.error('Failed to update');
      this.props.setTodos(oldTodos);
    });
  };

  changeTaskText = (text) => {
    const oldTodos = this.props.todos;
    let updatedTask;
    let updatedTodos = this.props.todos.map((task) => {
      if (task._id === this.state.todoToEdit._id) {
        task.todo = text;
        updatedTask = task;
      }
      return task;
    });
    this.props.setTodos(updatedTodos);
    this.state.todoToEdit = null;
    updateTodo(updatedTask, () => {
      toast.error('Failed to update');
      this.props.setTodos(oldTodos);
    });
  };

  changeTaskText = (text) => {
    let updatedTask;
    let updatedTodos = this.props.todos.map((task) => {
      if (task._id === this.state.todoToEdit._id) {
        task.todo = text;
        updatedTask = task;
      }
      return task;
    });
    updateTodo(updatedTask, () => {
      this.props.setTodos(updatedTodos);
    });
    this.state.todoToEdit = null;
  };

  filterTasks = (tasks) => {
    if (this.props.display === 'all') {
      return tasks;
    }

    if (this.props.display === 'completed') {
      return tasks.filter((task) => task.completed);
    }

    if (this.props.display === 'incomplete') {
      return tasks.filter((task) => !task.completed);
    }
  };

  searchTasks = () => {
    if (this.props.show) {
      return this.filterTasks(
        this.props.todos.filter((task) => {
          const lc = task.todo.toLowerCase();
          const filter = this.props.searchText.toLowerCase();
          return lc.includes(filter);
        })
      );
    } else {
      return this.filterTasks(this.props.todos);
    }
  };

  render() {
    return (
      <>
      <ToastContainer position="bottom-right" pauseOnFocusLoss draggable />
        <AddTask editTask={this.changeTaskText} addTask={this.addNewTask} toEditTodo={this.state.todoToEdit} clearEdit={this.clearTodoToEdit} />
        <ToDoList
          setEdit={this.setTodoToEdit}
          tasks={this.searchTasks()}
          deleteTask={this.deleteTask}
          changeTaskStatus={this.changeTaskStatus}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { todos: state.todo.todos };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeUser: () => {
      dispatch(userActions.removeUser());
    },
    setTodos: (todos) => {
      dispatch(todosActions.setTodos(todos));
    },
    setSignIn: (message) => {
      dispatch(signActions.setSignIn(message));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Todos));
