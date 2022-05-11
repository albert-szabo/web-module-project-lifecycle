import React from 'react';
import axios from 'axios';

import Form from './Form';
import TodoList from './TodoList';

const URL = 'http://localhost:9000/api/todos';

export default class App extends React.Component {
  state = {
    toDoItems: [],
    taskNameInput: '',
    displayCompletedTasks: true
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

  toggleCompleted = (id) => () => {
    axios.patch(`${URL}/${id}`)
      .then(response => {
        this.setState({ ...this.state, toDoItems: this.state.toDoItems.map(task => {
          if (task.id !== id) return task;
          return response.data.data;
        })})
      })
      .catch(error => console.error(error))
  }

  toggleDisplayCompletedTasks = () => {
    this.setState({ ...this.state, displayCompletedTasks: !this.state.displayCompletedTasks })
  }

  render() {
    return (
      <div>
        <TodoList
          toDoItems={this.state.toDoItems}
          displayCompletedTasks={this.state.displayCompletedTasks}
          toggleCompleted={this.toggleCompleted}
        />
        <Form
          onTaskFormSubmit={this.onTaskFormSubmit}
          taskNameInput={this.state.taskNameInput}
          onTaskNameInputChange={this.onTaskNameInputChange}
          toggleDisplayCompletedTasks={this.toggleDisplayCompletedTasks}
        />
      </div>
    )
  }
}
