import React, { Component } from "react";
import styles from "./TaskListItem.module.css";

class TaskListItem extends Component {
  createTasks = item => {
    let taskState = styles.taskItemCompleted;
    if (item.completedAt === null) {
      taskState = styles.taskItem;
    }

    const incompleteDependencies = item.dependencyIds.filter(dependency => {
      return dependency.completed === false;
    });

    if (incompleteDependencies.length > 0 && item.completedAt === null) {
      taskState = styles.taskItemLocked;
    }
    return (
      <li
        key={item.id}
        className={taskState}
        onClick={e => this.props.toggleItem(e, item.id)}
      >
        {item.task}
      </li>
    );
  };

  render() {
    const taskEntries = this.props.entries;
    const listItems = taskEntries.map(this.createTasks);

    return <ul className={styles.theList}>{listItems}</ul>;
  }
}

export default TaskListItem;
