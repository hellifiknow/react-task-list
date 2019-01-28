import React, { Component } from "react";
import update from "immutability-helper";
import jsonData from "./customData";
import TaskGroup from "./components/TaskGroup/TaskGroup";
import TaskList from "./components/TaskList/TaskList";

let importedGroups = [];

class App extends Component {
  constructor() {
    super();

    this.state = {
      groups: [],
      itemsShown: false
    };

    const map = new Map();
    for (const item of jsonData) {
      if (!map.has(item.group)) {
        map.set(item.group, true);
        importedGroups.push({
          text: item.group,
          key: item.group,
          items: [],
          showItems: false
        });
      }

      let importedGroup = importedGroups.find(group => {
        return group.text === item.group;
      });
      let itemWithProps = item;
      const dependencyIds = item.dependencyIds.map(dependency => {
        return { id: dependency, completed: false };
      });
      itemWithProps.dependencyIds = dependencyIds;

      importedGroup.items.push(itemWithProps);

      importedGroups = update(importedGroups, {
        [item.group]: { $set: importedGroup }
      });
    }
  }

  componentDidMount() {
    const groups = [...this.state.groups, ...importedGroups];
    this.setState({
      groups: groups,
      currentGroup: { text: "", key: "", items: [], showItems: false }
    });
  }

  toggleGroup = (e, key) => {
    e.stopPropagation();
    const filteredItem = this.state.groups.find(item => {
      return item.key === key;
    });

    filteredItem.showItems = !filteredItem.showItems;

    this.updateGroupItem(filteredItem);
  };

  updateGroupItem = groupItem => {
    let importedGroup = this.state.groups.find(item => {
      return item.key === groupItem.group;
    });

    let importedGroups = update(this.state.groups, {
      [groupItem.group]: { $set: importedGroup }
    });

    for (var i = 0; i < importedGroups.length; i++) {
      importedGroups[i].items = importedGroups[i].items.map(item => {
        if (
          item.dependencyIds.findIndex(
            dependency => dependency.id === groupItem.id
          ) >= 0
        ) {
          let index = item.dependencyIds.findIndex(
            dependency => dependency.id === groupItem.id
          );
          item.dependencyIds[index].completed = groupItem.completedAt !== null;
        }
        return item;
      });
    }

    let listShown = importedGroups.filter(group => {
      return group.showItems === true;
    });

    this.setState({
      groups: importedGroups,
      itemsShown: listShown.length > 0
    });
  };

  render() {
    const listShown = this.state.groups.find(group => {
      return group.showItems === true;
    });
    return (
      <div className="App">
        {this.state.itemsShown ? (
          <TaskList
            updateGroupItem={this.updateGroupItem}
            group={listShown}
            key={listShown.key}
            toggleGroup={this.toggleGroup}
          />
        ) : (
          <TaskGroup
            itemsShown={this.state.itemsShown}
            groups={this.state.groups}
            updateGroupItem={this.updateGroupItem}
            toggleGroup={this.toggleGroup}
          />
        )}
      </div>
    );
  }
}

export default App;
