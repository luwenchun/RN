import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import navigationUtil from "../Navigator/navigationUtil";
export default class WelcomePage extends Component {
  componentDidMount() {
    this.timer = setTimeout(() => {
      navigationUtil.resetToHomePage({
        navigation: this.props.navigation
      });
      const { navigation } = this.props;
      navigation.navigate("Main");
    }, 200);
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome  to WelcomePage!</Text>
      </View>
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
