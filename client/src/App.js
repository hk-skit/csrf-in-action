import React from 'react';
import './App.css';
import { LoginForm, AddTodo, TodoList } from './components';
import { UserService, TodoService } from './services';

class App extends React.Component {
  state = { todos: [], isLoggedIn: null };

  loadTodos = () => {
    TodoService.getTodos()
      .then(({ todos }) => this.setState({ todos, isLoggedIn: true }))
      .catch(error => {
        if (error.response.status === 401) {
          this.setState({ isLoggedIn: false });
        }
      });
  };

  componentDidMount() {
    this.loadTodos();
  }

  handleLogin = ({ username, password }) => {
    UserService.login({ username, password })
      .then(() => {
        this.setState({ isLoggedIn: true });
        this.loadTodos();
      })
      .catch(error => alert('Invalid credentials or password'));
  };

  handleAddTodo = ({ text }) => {
    TodoService.createTodo(text)
      .then(({ _id }) =>
        this.setState({
          todos: [...this.state.todos, { _id, text, completed: false }]
        })
      )
      .catch(error => alert('Unable to create todo.'));
  };

  handleToggle = todo => {
    TodoService.updateTodo(todo)
      .then(() =>
        this.setState({
          todos: this.state.todos.map(td => (td._id !== todo._id ? td : todo))
        })
      )
      .catch(error => alert('Unable to toggle'));
  };

  handleLogout = () => {
    UserService.logout().finally(() =>
      this.setState({ todos: [], isLoggedIn: false })
    );
  };

  render() {
    const { todos, isLoggedIn } = this.state;
    if (isLoggedIn === null) {
      return <p>Loading...</p>;
    }
    return (
      <div className="App">
        {isLoggedIn ? (
          <div>
            <div
              style={{
                display: `flex`,
                justifyContent: `space-between`,
                alignItems: `center`
              }}
            >
              <h3>Todos:</h3>
              <div>
                <button onClick={this.handleLogout}>Logout</button>
              </div>
            </div>
            <AddTodo onAdd={this.handleAddTodo} />
            {todos.length ? (
              <TodoList todos={todos} onToggle={this.handleToggle} />
            ) : (
              <p>No todos. Yay!!</p>
            )}
          </div>
        ) : (
          <div>
            <h3>Login:</h3>
            <LoginForm onSubmit={this.handleLogin} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
