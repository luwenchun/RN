import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import { Provider } from "react-redux";
import AppNavigator from "./Navigator/AppNavigator";

import store from "./store";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
