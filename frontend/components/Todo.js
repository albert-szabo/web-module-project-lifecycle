import React from 'react';

export default class Todo extends React.Component {
  render() {
    return (
      <div onClick={this.props.toggleCompleted(this.props.task.id)}>
        {this.props.task.name} {this.props.task.completed ? <span>-completed</span> : <span></span>}
      </div>
    )
  }
}
