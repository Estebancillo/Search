import React, {Component} from 'react';
import {View, Text, StyleSheet, ListView} from 'react-native';
import {PropTypes} from 'prop-types'
import TaskRow from './TaskRow';



export default class TaskList extends Component {
constructor(props){
  super(props);
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2)=> r1 !== r2
  });
  this.state = {

    dataSource: ds.cloneWithRows(props.todos)
    };
}

renderRow(todo){
  return(
    <TaskRow todo={todo} />

  )
}
  render(){
    return(
      <View>
        <ListView
        key={this.props.todos}
        dataSource = {this.state.dataSource}
        renderRow={this.renderRow.bind(this)}

        />
      </View>
    );
  }
}

