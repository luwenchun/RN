import React, { Component } from "react";
import {createStackNavigator, createSwitchNavigator,createMaterialTopTabNavigator} from 'react-navigation';
import {createBottomTabNavigator, } from 'react-navigation-tabs';
import Page1 from '../pages/Page1'
import Page2 from '../pages/Page2'
import Login from '../pages/Login'
import HomePage from '../pages/HomePage'
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
const AppStack = createStackNavigator({
    Home: {
        screen: HomePage
    },
    Page1: {
        screen: Page1
    },
     Page2: {
        screen: Page2
    }

});
const AuthStack = createStackNavigator({
    Login: {
        screen: Login
    },
},{
    navigationOptions: {
        // header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
    }
});
export const SwitchNavigator =  createSwitchNavigator(
    {
        Auth: AuthStack,
        App: AppStack,
    },
    {
        initialRouteName: 'Auth',
    }
);
export const MaterialTopTabNavigator = createMaterialTopTabNavigator({//在这里配置页面的路由
        Page1: {
            screen: Page1,
            navigationOptions: {
                tabBarLabel: 'Page10',
                // tabBarIcon: ({tintColor, focused}) => (
                //     <Ionicons
                //         // name={'ios-home'}
                //         size={26}
                //         style={{color: tintColor}}
                //     />
                // ),
            }
        },
        Page4: {
            screen: Page1,
            navigationOptions: {
                tabBarLabel: 'Page4',
                // tabBarIcon: ({tintColor, focused}) => (
                //     <Ionicons
                //         // name={'ios-people'}
                //         size={26}
                //         style={{color: tintColor}}
                //     />
                // ),
            }
        },
        Page3: {
            screen: Page1,
            navigationOptions: {
                tabBarLabel: 'Page3',
                // tabBarIcon: ({tintColor, focused}) => (
                //     <Ionicons
                //         // name={'ios-chatboxes'}
                //         size={26}
                //         style={{color: tintColor}}
                //     />
                // ),
            }
        },
    },
    {
        tabBarOptions: {
            tabStyle: {
                minWidth: 50
            },
            upperCaseLabel: false,//是否使标签大写，默认为true
            scrollEnabled: true,//是否支持 选项卡滚动，默认false
            // activeTintColor: 'white',//label和icon的前景色 活跃状态下（选中）
            // inactiveTintColor: 'gray',//label和icon的前景色 活跃状态下（未选中）
            style: {
                backgroundColor: '#678',//TabBar 的背景颜色
            },
            indicatorStyle: {
                height: 2,
                backgroundColor: 'white',
            },//标签指示器的样式
            labelStyle: {
                fontSize: 13,
                marginTop: 6,
                marginBottom: 6,
            },//文字的样式
        },
    }
);