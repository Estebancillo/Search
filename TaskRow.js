import React, {Component} from 'react';
import {View, Text, StyleSheet } from 'react-native';
import {PropTypes} from 'prop-types'

export default class TaskRow extends Component {
  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.label}>
        {this.props.todo.task}..
        </Text>
      </View>

    );
  }
}

TaskRow.PropTypes={
  todo: PropTypes.shape({
    task: PropTypes.string.isRequiered,
  }).isRequiered,
};
const styles= StyleSheet.create({
  container:{
    backgroundColor:'white',
    borderWidth:1,
    borderColor:'black',
    padding:20,
    flex:1,
    flexDirection:'row',
    justifyContent: 'space-between',
    marginBottom:30,
    marginRight:30
  },
  label:{
    fontSize:20,
    fontWeight:'bold'
  }

})
