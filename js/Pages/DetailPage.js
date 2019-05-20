import React, { Component } from "react";
import { Platform, StyleSheet, Text, View ,WebView} from "react-native";

export default class DetailPage extends Component {
  constructor(props){
    super(props)
  }
  render() {
    // console.log(this.props)
    const {navigation:{state:{params:params}}}=this.props
    console.log(params.url)
    const url=params.url
    return (
      <WebView
      source={{ uri: url }}
      style={{ marginTop: 20 }}
    />
      // <View style={styles.container}>
      //   {/* <Text style={styles.welcome}>Welcome to DetailPage!</Text> */}
      //   <WebView
      //   source={{uri:"http://mini.eastday.com/mobile/190520090957254.html" }}
      //   // style={{marginTop: 20}}
      // />
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
