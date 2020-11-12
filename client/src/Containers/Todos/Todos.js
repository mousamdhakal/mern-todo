import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ToDoList from '../TodoList/TodoList';
import AddTask from '../AddTask/AddTask';
import * as todosActions from '../../actions/todosActions';
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

    getAllTodo((todos) => {
      if (todos) {
        this.props.setTodos(todos);
      } else {
        setAuthorizationToken(false);
        localStorage.removeItem('jwtToken');
        this.props.history.push('/signin');
      }
    });
  }

  deleteTask = (id) => {
    let tasks = this.props.todos.filter((todo) => {
      return todo._id !== id;
    });
    deleteTodo(id, () => {
      this.props.setTodos(tasks);
    });
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
    let updatedTask;
    let updatedTodos = this.props.todos.map((task) => {
      if (task._id === id) {
        task.completed = !task.completed;
        updatedTask = task;
      }
      return task;
    });
    updateTodo(updatedTask, () => {
      this.props.setTodos(updatedTodos);
    });
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
        <AddTask addTask={this.addNewTask} />
        <ToDoList
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
    setTodos: (todos) => {
      dispatch(todosActions.setTodos(todos));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Todos));
