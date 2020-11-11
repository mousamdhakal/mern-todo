import React, { Component } from 'react';

class AddTask extends Component {
  constructor() {
    super();

    this.state = {
      text: '',
    };
  }

  handleChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.text) {
      this.props.addTask(this.state.text);
      this.setState({
        text: '',
      });
    }
  };

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <input
          className="form__input"
          type="text"
          placeholder="Add task here"
          onChange={this.handleChange}
          value={this.state.text}
          autoFocus
        />
      </form>
    );
  }
}

export default AddTask;
