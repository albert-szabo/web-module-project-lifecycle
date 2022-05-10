import React from 'react';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos';

export default class App extends React.Component {
  state = {
    toDoItems: []
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
        <form>
          <input type='text' placeholder='Enter new task here'></input>
          <button>Add</button>
          <button>Clear</button>
        </form>
      </div>
    )
  }
}
