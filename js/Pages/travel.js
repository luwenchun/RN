import React, { Component } from "react";
import { Image, Button, Platform, StyleSheet, FlatList,Text,RefreshControl,ActivityIndicator,View } from "react-native";

import { connect } from "react-redux";
import { onThemeChange } from "../Actions/theme";
import navigationUtil from "../Navigator/navigationUtil";
// import anButton from '@ant-design/react-native/lib/button';
var CITYS=["北京1","北京2","北京","北京","北京","北京","北京5"]
class IndexTab extends Component{
  constructor(props){
    super(props);
    this.state={
      Loadding:false,
      dataArray:CITYS

    }
  }
  loadData=()=>{
      this.setState({
        Loadding:true
      })
      setTimeout(()=>{
        var dataArray=[]
          for(let i=this.state.dataArray.length-1;i>=0;i--){
            dataArray.push(this.state.dataArray[i])
          }
          this.setState({
            dataArray:dataArray,
            Loadding:false
          })
      },2000)
  }
  getIn=()=>{
      return <View>
        <ActivityIndicator
        size={"large"}
        animating={true}
        />
        </View>
  }
  _renderItem(data){
    return <View style={{height:200,borderWidth:1,flex:1,borderColor: "red",}}>
      <Text>{data.item}</Text>
      {/* <Text><anButton>Start</anButton></Text> */}
      
    </View>
  }
  render() {
    const { tabName } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataArray}
          renderItem={(data)=>this._renderItem(data)}
          // refreshing={this.state.Loadding}
          //      onRefresh={this.loadData}
          refreshControl={
            <RefreshControl
              title={"Loading"}
              colors={"red"}//安卓
              tintColor={"red"}//ios
              titleColor={"red"}//ios
               refreshing={this.state.Loadding}
               onRefresh={this.loadData}
            />
          }
          ListFooterComponet={
            this.getIn
          }
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(onThemeChange(theme))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexTab);
