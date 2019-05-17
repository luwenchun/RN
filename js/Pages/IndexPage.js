import React, { Component } from "react";
import { Button, Platform, StyleSheet, Text, View } from "react-native";
import {
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";
import IndexTab from "../Pages/IndexTab";
import { connect } from "react-redux";
import navigationUtil from "../Navigator/navigationUtil";
import FontAwesome from "react-native-vector-icons/FontAwesome";
class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.tabNames = [
      "ios",
      "android",
      "nodeJs",
      "Vue",
      "React",
      "React Native"
    ];
  }
  _genTabs() {

   var  tabs={
      tab1:{
        screen:function(props){//props是redux传递的全局状态通过conner映射
          return <IndexTab {...props} tabName={'ios'} />
        },
        navigationOptions: {
          title: "ios",
          tabBarIcon: ({ tintColor, focused }) => (
            <FontAwesome name={"home"} size={26} style={{ color: tintColor }} />
          )
        }
      },
      tab2:{
        screen:function(props){//props是redux传递的全局状态通过conner映射
          return <IndexTab {...props} tabName={'ios'} />
        },
        navigationOptions: {
          title: "ios",
          tabBarIcon: ({ tintColor, focused }) => (
            <FontAwesome name={"home"} size={26} style={{ color: tintColor }} />
          )
        }
      },
      tab3:{
        screen:function(props){//props是redux传递的全局状态通过conner映射
          return <IndexTab {...props} tabName={'ios'} />
        },
        navigationOptions: {
          title: "ios",
          tabBarIcon: ({ tintColor, focused }) => (
            <FontAwesome name={"home"} size={26} style={{ color: tintColor }} />
          )
        }
      },
      tab4:{
        screen:function(props){//props是redux传递的全局状态通过conner映射
          return <IndexTab {...props} tabName={'ios'} />
        },
        navigationOptions: {
          title: "ios",
          tabBarIcon: ({ tintColor, focused }) => (
            <FontAwesome name={"home"} size={26} style={{ color: tintColor }} />
          )
        }
      }
    }
    // const tabs = {};
    // this.tabNames.forEach((item, index) => {
    //   console.log(item)
    //   tabs[`tab${index}`] = {
    //     screen: props => <IndexTab {...props} tabName={item} />,
    //     navigationOptions: {
    //       title: item,
    //       tabBarIcon: ({ tintColor, focused }) => (
    //         <FontAwesome name={"home"} size={26} style={{ color: tintColor }} />
    //       )
    //     }
    //   };
    // });
    return tabs;
  }
  render() {
    console.log(this.props);
    // const TabBackground = this.props.theme;
    const TabNavigator = createAppContainer(
      createMaterialTopTabNavigator(this._genTabs(), {
        tabBarOptions: {
          tabStyle: {},
          showIcon:true,
          upperCaseLabel: false,
          scrollEnabled: true,
          style: {
            backgroundColor: this.props.theme
          }
        }
      })
    );
    return (
      <View style={{ flex: 1, marginTop: 30 }}>
        <TabNavigator />
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

const mapStateToProps = state => ({
  theme: state.theme.theme
});

export default connect(mapStateToProps)(IndexPage);
