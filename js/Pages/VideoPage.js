import React, { Component } from "react";
import { Platform, StyleSheet, Text, View ,Button,Image} from "react-native";
import { onThemeChange,onAnsyChange } from "../Actions/theme";
import { connect } from "react-redux";
class VideoPage extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  }
  render() {
    return (
      <View style={styles.container}>
      <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri: "http://images4.c-ctrip.com/target/200h0a0000004ddlc7A8B_550_412.jpg"
          }}
        />
        <Text style={styles.welcome} >Welcome to 视频页面!{this.props.theme}{this.props.num}</Text>
        <Button
          title={"修改视频页面状态+1"}
          onPress={() => {
            this.props.onThemeChanges(this.props.theme);
            // navigationUtil.goPage(this.props, "DetailPage");
          }}
        />
         <Button
          title={"异步修改视频页面状态+99"}
          onPress={() => {
            this.props.onAnsyChanges("99");
            // navigationUtil.goPage(this.props, "DetailPage");
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

const mapStateToProps = state => ({
  theme: state.theme.theme,
  num:state.theme.num,
});
const mapDispatchToProps = dispatch => {
    return {
      onAnsyChanges:num=>dispatch(onAnsyChange(num)),
      onThemeChanges: num => dispatch(onThemeChange(num)),
      
    }
 
};
export default connect(mapStateToProps, mapDispatchToProps)(VideoPage);
