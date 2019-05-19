import React, { Component } from "react";
import { Image, Button, Platform, StyleSheet, Text, View } from "react-native";

import { connect } from "react-redux";
import { onThemeChange } from "../Actions/theme";
import navigationUtil from "../Navigator/navigationUtil";
class IndexTab extends Component {
  render() {
    const { tabName } = this.props;
    return (
      <View style={styles.container}>
        {/* <Text style={styles.welcome}>Welcome to {tabName}</Text> */}
        {/* 跳转 */}
        {/* <Button
          title={"go to DetailPage"}
          onPress={() => {
            navigationUtil.goPage(this.props, "DetailPage");
          }}
        /> */}
        {/* 修改store */}
        <Button
          title={"修改视频页面状态"}
          onPress={() => {
            this.props.onThemeChange("#000");
            // navigationUtil.goPage(this.props, "DetailPage");
          }}
        />
        {/* <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri: "https://img.alicdn.com/tps/i4/TB1vDAJQ9zqK1RjSZPxSuw4tVXa.jpg"
          }}
        /> */}
        <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri: "http://images4.c-ctrip.com/target/200h0a0000004ddlc7A8B_550_412.jpg"
          }}
        />
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
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(onThemeChange(theme))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexTab);
