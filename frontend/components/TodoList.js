import React from 'react';

import Todo from './Todo';

export default class TodoList extends React.Component {
  render() {
    return (
      <div>
      <h2>To Do:</h2>
      {
        this.props.toDoItems.reduce((accumulator, task) => {
          if (this.props.displayCompletedTasks || !task.completed) return accumulator.concat(
            <Todo
              key={task.id}
              toggleCompleted={this.props.toggleCompleted}
              task={task}
            />
          )
          return accumulator;
        }, [])
      }
    </div>
    )
  }
}
