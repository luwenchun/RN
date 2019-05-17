import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

import HomePage from "../Pages/HomePage";
import WelcomePage from "../Pages/WelcomePage";
import DetailPage from "../Pages/DetailPage";

//引入redux
import { connect } from "react-redux";

import {
  createReactNavigationReduxMiddleware,
  createReduxContainer
} from "react-navigation-redux-helpers";

export const rootCom = "Init"; //设置根路由

const AppInitNavigator = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      header: null
    }
  }
});
const AppMainNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      header: null
    }
  },
  DetailPage: {
    screen: DetailPage
  }
});

export const RootNavigator = createAppContainer(
  createSwitchNavigator({
    Init: AppInitNavigator,
    Main: AppMainNavigator
  })
);

/**
 * 1.初始化react-navigation与redux的中间件，
 * 该方法的一个很大的作用就是为reduxifyNavigator的key设置actionSubscribers(行为订阅者)
 */

//react-navigation-redux-helpers3.0变更,createReactNavigationReduxMiddleware的参数顺序发生了变化
export const middleware = createReactNavigationReduxMiddleware(
  state => state.nav,
  "root"
);

/* 2.将根导航器组件传递给 reduxifyNavigator 函数,
 * 并返回一个将navigation state 和 dispatch 函数作为 props的新组件；
 * 使用createReduxContainer方法，将RootNavigator封装成高阶组件AppWithNavigationState
 * 这个高阶组件完成了navigation prop的替换，改成了使用redux里的navigation
 *
 * */

const AppWithNavigationState = createReduxContainer(RootNavigator, "root");

//State到Props的映射关系
const mapStateToProps = state => {
  return {
    state: state.nav
  };
};

//使用Redux的connect函数再封装一个高阶组件,连接 React 组件与 Redux store
export default connect(mapStateToProps)(AppWithNavigationState);
