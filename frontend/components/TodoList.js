import React from 'react';

export default class TodoList extends React.Component {
  render() {
    return (
      <div>
      <h2>To Do:</h2>
      {
        this.props.toDoItems.reduce((accumulator, task) => {
          if (this.props.displayCompletedTasks || !task.completed) return accumulator.concat(
            <div key={task.id} onClick={this.props.toggleCompleted(task.id)}>{task.name} {task.completed ? <span>-completed</span> : <span></span>}</div>
          )
          return accumulator;
        }, [])
      }
    </div>
    )
  }
}
