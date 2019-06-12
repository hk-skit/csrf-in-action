import React from 'react';

class AddTodo extends React.Component {
  state = { text: '' };

  handleChange = event => this.setState({ text: event.target.value });

  handleSubmit = event => {
    event.preventDefault();
    this.props.onAdd({ text: this.state.text });
    this.setState({ text: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.text}
          placeholder="what's on your list"
          onChange={this.handleChange}
          required
        />
        <input type="submit" value="Add" />
      </form>
    );
  }
}

export default AddTodo;
