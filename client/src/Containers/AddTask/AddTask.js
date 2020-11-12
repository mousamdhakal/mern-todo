import React, { Component } from 'react';

class AddTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      edit: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.toEditTodo &&
      this.props.toEditTodo != prevProps.toEditTodo
    ) {
      this.setState({
        text: this.props.toEditTodo.todo,
        edit: true,
      });
      document.getElementById('todo-form').focus();
    }
  }

  handleChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  removeEdit = () => {
    this.setState({
      text: '',
      edit: false,
    });
    this.props.clearEdit();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.text && !this.state.edit) {
      this.props.addTask(this.state.text);
      this.setState({
        text: '',
      });
    } else if (this.state.text && this.state.edit) {
      this.props.editTask(this.state.text);
      this.removeEdit();
    }
  };

  render() {
    return (
      <form className="form todo-form" onSubmit={this.handleSubmit}>
        <input
          id="todo-form"
          className="form__input"
          type="text"
          placeholder="Add task here"
          onChange={this.handleChange}
          value={this.state.text}
          autoFocus
        />
        {this.state.edit ? (
          <button
            type="reset"
            className="todos__button todos__button--clear-edit"
            onClick={() => this.removeEdit()}
          >
            <i className="far fa-times-circle"></i>
          </button>
        ) : null}
      </form>
    );
  }
}

export default AddTask;
