import React, { Component } from "react";
import styles from "./TaskGroupItem.module.css";

class TaskGroupItem extends Component {
  createTaskGroups = item => {
    return (
      <li
        key={item.key}
        className={styles.taskGroupItem}
        onClick={e => this.props.toggleGroup(e, item.key)}
      >
        {item.showItems ? null : (
          <div className={styles.taskGroupItemHeader}>
            <h3>{item.text}</h3>
            <span>
              {
                item.items.filter(task => {
                  return task.completedAt !== null;
                }).length
              }{" "}
              OF {item.items.length} TASKS COMPLETE
            </span>
          </div>
        )}
      </li>
    );
  };

  render() {
    const taskGroupEntries = this.props.groups;
    const listItems = taskGroupEntries.map(this.createTaskGroups);

    return <ul className={styles.theList}>{listItems}</ul>;
  }
}

export default TaskGroupItem;
