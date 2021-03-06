import React, { Component } from 'react';
import { StyleSheet,  Text, ListView,  View, TouchableHighLight, Dimensions, Animated, TextInput } from 'react-native';

const {width, height} = Dimensions.get('window');


export default class App extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.dataSource({rowHasChanged:(r1,r2)=>r1 !== r2})
    this.state={
      isLoaded: false,
      dataSource: ds.cloneWithRows([]),
      rowData: '',
      empty: true,
      isLoading: false,
      rotateY: newAnimated.Value(0),
      translateX: newAnimated.Value(width),
      text:''
    };

  }
  componentWillMount(){
    this.fetchData()
  }
  fetchData(){
    fetch('https://api.tvmaze.com/schedule')
    .then((res)=>res.json())
    .then((data)=>{
      this.setState({
        dataSource:this.state.dataSource.cloneWithRows(data),
        isLoading:false,
        empty:false,
        rawData: data
      })
    })
    .catch((error) =>{
      this.setState({
        empty:true,
      })
    })
  }
  renderRow(rowData){
    return(
      <TouchableHighLight>
        <View style={styles.containerCell}>
          <View style={styles.footerContainer}>
            <View style={styles.footerTextContainer}>
              <Text style={styles.text}>{rowData.name}</Text>
              <Text style={[styles.text, styles.textTitle]}>{rowData.airdate}</Text>
              <Text style={[styles.text, style.textBy]}>by {rowData.number}</Text>
            </View>
          </View>
        </View>
      </TouchableHighLight>
    )
  }


  filterSearch(text){
    this.setState({text})
    let newData= this.dataFilter(text, this.state.rawData);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newData),
      isLoaded:true,
      empty: false
    })
  }
  dataFilter(text,data){
    return data.filter(function(item) {
      const itemData= item.name.toUpperCase()
      const textData = text.toUppCase()
      return itemData.indexOf(textData) > -1
    })

  }
  render() {
    return (
<View style={styles.container}>
  <Animated.View
    styles={syles.content,{width: width,
    backgroundColor: 'grey',
  flex:1,
transfomr:[{
  perspective:450
},
{
translateX: this.state.translateX.interpolate({
  inputRange:[0,width],
  outputRange: [width,0]
})
},
{
  rotateY: this.state.rotateY.interpolate({
    inputRange:[0,1],
    outputRange: ['0deg','-10deg']
  })
}
]
}}>

<TextInput style={styles.TextInput}
onChangeText={(text) => this.filterSearch(text)}
value={this.state.text}
/>

<ListView
enableEmptySections={true}
style={styles.ListContainer}
renderRow={this.renderRow.bind(this)}
dataSource={this.state.dataSource}/>

  </Animated.View>

</View>


    );
  }
}

const styles = StyleSheet.create({
  containerCell:{marginBottom:10},
  footerContainer:{flexDirection:'row', paddingHorizontal:10, paddingVertical:10, backgroundColor:'red'},
  footerTextContainer:{backgroundColor:'red'},
  text:{color:'white'},
  textTitle:{fontSize:15},
  textBy:{fontSize:12},
  TextInput:{height:20,borderWidth:1,borderColor:'black',marginBottom:10,marginHorizontal:10},
  ListContainer:{marginHorizontal:10},
  content:{zIndex:1}

})
