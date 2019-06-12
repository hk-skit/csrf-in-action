import React from 'react';

class LoginForm extends React.Component {
  state = { username: '', password: '' };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.onSubmit({ username, password });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} autoComplete="off">
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={this.handleChange}
          required
        />
        <br />

        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={this.handleChange}
          required
        />
        <br />
        <input type="submit" value="Login" />
      </form>
    );
  }
}

export default LoginForm;
