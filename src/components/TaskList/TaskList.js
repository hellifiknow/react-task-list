import React, { Component } from "react";
import TaskListItem from "./TaskListItem/TaskListItem";
import styles from "./TaskList.module.css";

class TaskList extends Component {
  toggleItem = (e, id) => {
    e.stopPropagation();
    const filteredItem = this.props.group.items.find(item => {
      return item.id === id;
    });

    const incompleteDependencies = filteredItem.dependencyIds.filter(
      dependency => {
        return dependency.completed === false;
      }
    );

    if (incompleteDependencies.length > 0 && filteredItem.completedAt === null)
      return;
    if (filteredItem.completedAt === null) {
      filteredItem.completedAt = new Date();
    } else {
      filteredItem.completedAt = null;
    }

    this.props.updateGroupItem(filteredItem);
  };

  render() {
    return (
      <div className={styles.taskListMain}>
        <div className={styles.header}>
          <div>
            <span>{this.props.group.text}</span>
            <button
              onClick={e => this.props.toggleGroup(e, this.props.group.key)}
            >
              All Groups
            </button>
          </div>
        </div>
        <TaskListItem
          key={this.props.group.group}
          toggleItem={this.toggleItem}
          entries={this.props.group.items}
        />
      </div>
    );
  }
}

export default TaskList;
