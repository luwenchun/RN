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
