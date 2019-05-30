import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import {
  createAppContainer,
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";

import IndexPage from "./IndexPage";
import DetailPage from "./DetailPage";
import MyPage from "./MyPage";
import Day1 from "../test/day1"
import VideoPage from "./VideoPage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import navigationUtil from "../Navigator/navigationUtil";
const TABS = {
  MyPage: {
    screen: Day1,
    navigationOptions: {
      tabBarLabel: "demo",
      tabBarIcon: ({ tintColor, focused }) => (
        <FontAwesome name={"user"} size={26} style={{ color: tintColor }} />
      )
    }
  },
  IndexPage: {
    screen: IndexPage,
    navigationOptions: {
      tabBarLabel: "首页",
      tabBarIcon: ({ tintColor, focused }) => (
        <FontAwesome name={"home"} size={26} style={{ color: tintColor }} />
      )
    }
  },
  VideoPage: {
    screen: VideoPage,
    navigationOptions: {
      tabBarLabel: "视频",
      tabBarIcon: ({ tintColor, focused }) => (
        <FontAwesome
          name={"video-camera"}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
 
};
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }
  _TabNavigator() {
    return createAppContainer(createBottomTabNavigator(TABS,{
      tabBarOptions: {
        style: {
          backgroundColor: "#ccc"
        }
      }
    }));
  }
  render() {
    navigationUtil.navigation = this.props.navigation;
    const Tabs = this._TabNavigator();
    return <Tabs />;
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
