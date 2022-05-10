import React from 'react';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos';

export default class App extends React.Component {
  state = {
    toDoItems: [],
    taskNameInput: ''
  }

  fetchAllToDoItems = () => {
    axios.get(URL)
      .then(response => {
        this.setState({ ...this.state, toDoItems: response.data.data })
      })
      .catch(error => console.error(error))
  }

  componentDidMount() {
    this.fetchAllToDoItems();
  }

  onTaskNameInputChange = (event) => {
    const { value } = event.target;
    this.setState({ ...this.state, taskNameInput: value });
  }

  postNewToDoItem = () => {
    axios.post(URL, { name: this.state.taskNameInput })
      .then(response => {
        this.setState({ ...this.state, toDoItems: this.state.toDoItems.concat(response.data.data) })
        this.setState({ ...this.state, taskNameInput: '' })
      })
      .catch(error => console.error(error))
  }

  onTaskFormSubmit = (event) => {
    event.preventDefault();
    this.postNewToDoItem();
  }

  render() {
    return (
      <div>
        <div>
          <h2>To Do:</h2>
          {
            this.state.toDoItems.map(task => {
              return <div key={task.id}>{task.name}</div>
            })
          }
        </div>
        <form onSubmit={this.onTaskFormSubmit}>
          <input type='text' placeholder='Enter new task here' value={this.state.taskNameInput} onChange={this.onTaskNameInputChange}></input>
          <button>Add</button>
          <button>Clear Completed Tasks</button>
        </form>
      </div>
    )
  }
}
