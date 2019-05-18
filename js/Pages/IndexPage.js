import React, { Component } from "react";
import { Button, Platform, StyleSheet, Text, View } from "react-native";
import {
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";
import Scenic from "../Pages/scenic";
import Hotel from "../Pages/hotel";
import Gourmet from "../Pages/gourmet";
import Travel from "../Pages/travel";
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

   const  tabs={
      tab1:{
        screen:function(props){//props是redux传递的全局状态通过conner映射
          return <Scenic {...props} tabName={'景点'}  />
        },
        navigationOptions: {
          tabBarIcon: ({ tintColor, focused }) => (
            <FontAwesome name={"home"} size={26} style={{ color: "blue" }} />
          ),
          tabBarLabel:<Text style={styles.tabtile}>景点</Text>
        }
      },
      tab2:{
        screen:function(props){//props是redux传递的全局状态通过conner映射
          return <Hotel {...props} tabName={'酒店'} />
        },
        navigationOptions: {
          tabBarLabel:<Text style={styles.tabtile}>酒店</Text>,
          tabBarIcon: ({ tintColor, focused }) => (
            <FontAwesome name={"home"} size={26} style={{ color: "blue" }} />
          )
        }
      },
      tab3:{
        screen:function(props){//props是redux传递的全局状态通过conner映射
          return <Gourmet {...props} tabName={'美食林'} />
        },
        navigationOptions: {
          tabBarLabel:<Text style={styles.tabtile}>美食林</Text>,
          tabBarIcon: ({ tintColor, focused }) => (
            <FontAwesome name={"home"} size={26}   style={{ color: "blue" }} />
          )
        }
      },
      tab4:{
        screen:function(props){//props是redux传递的全局状态通过conner映射
          return <Travel {...props} tabName={'行程路线'}  style={styles.tab} />
        },
        navigationOptions: {
          tabBarLabel:<Text style={styles.tabtile}>行程路线</Text>,
          tabBarIcon: ({ tintColor, focused }) => (
            <FontAwesome name={"home"} size={26} style={{ color: "blue" }} />
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
        // swipeEnabled:true,//是否允许在标签页之间进行滑动。
        tabBarOptions: {
         
          labelStyle:{//字体
            fontSize:12,
            marginTop:4,
            marginBottom: 4,
          },
          tabStyle: {//
            width:120,
          },
          showIcon:true,
          upperCaseLabel: false,//英文首字母大写
          scrollEnabled: true,//是否允许滑动切换
          // this.props.theme
          style: {
            backgroundColor: "#ccc"
          },
          indicatorStyle:{
            height:2,
            backgroundColor:"red"
          }
        }
      })
    );
    return (
      <View style={{ flex: 1, marginTop: 50 }}>
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
  },
  tabtile:{
    //  backgroundColor:"black",
    marginTop: 5,
     color:"black"
  }
});

const mapStateToProps = state => ({
  theme: state.theme.theme
});

export default connect(mapStateToProps)(IndexPage);
