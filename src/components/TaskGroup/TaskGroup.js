import React, { Component } from "react";
import TaskGroupItem from "./TaskGroupItem/TaskGroupItem";
import styles from "./TaskGroup.module.css";

class TaskGroup extends Component {
  render() {
    return (
      <div className={styles.taskGroupMain}>
        <div className={styles.header}>
          <span>Things To Do</span>
        </div>
        <TaskGroupItem
          itemsShown={this.props.itemsShown}
          groups={this.props.groups}
          updateGroupItem={this.props.updateGroupItem}
          toggleGroup={this.props.toggleGroup}
        />
      </div>
    );
  }
}

export default TaskGroup;
