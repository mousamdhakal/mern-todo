import React from 'react';

const ToDoList = (props) => {
  let todoList = props.tasks.length ? (
    props.tasks.map((task) => {
      return (
        <div className="todos__list-item" key={task._id}>
          <span
            className={
              task.completed
                ? 'todos__text todos__text--complete'
                : 'todos__text'
            }
          >
            {task.todo}
          </span>
          <button
            className="todos__button todos__button--delete"
            onClick={() => props.deleteTask(task._id)}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
          <button
            className="todos__button todos__button--checkbox"
            onClick={() => props.changeTaskStatus(task._id)}
          >
            {task.completed ? (
              <i className="far fa-check-square"></i>
            ) : (
              <i className="far fa-square"></i>
            )}
          </button>
          <button
            className="todos__button todos__button--edit"
            onClick={() => props.setEdit(task)}
          >
            <i className="fas fa-edit"></i>
          </button>
        </div>
      );
    })
  ) : (
    <span className="todos__text todos__text--empty">No tasks found.</span>
  );
  return <div className="todos__list">{todoList}</div>;
};

export default ToDoList;
