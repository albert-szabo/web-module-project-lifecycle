import React from 'react';

export default class Form extends React.Component {
  render() {
    return (
      <>
        <form onSubmit={this.props.onTaskFormSubmit}>
          <input type='text' placeholder='Enter new task here' value={this.props.taskNameInput} onChange={this.props.onTaskNameInputChange}></input>
          <button>Add</button>
        </form>
        <button onClick={this.props.toggleDisplayCompletedTasks}>Clear Completed Tasks</button>
      </>
    )
  }
}
