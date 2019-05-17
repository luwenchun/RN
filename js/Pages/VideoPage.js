import React, { Component } from "react";
import { Platform, StyleSheet, Text, View ,Button} from "react-native";
import { onThemeChange } from "../Actions/theme";
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
        <Text style={styles.welcome} >Welcome to 视频页面!{this.props.theme}{this.props.num}</Text>
        <Button
          title={"修改视频页面状态"}
          onPress={() => {
            this.props.onThemeChanges("#000");
            // navigationUtil.goPage(this.props, "DetailPage");
          }}
        />
         {/* <Button
          title={"异步修改视频页面状态"}
          onPress={() => {
            this.props.onAnsyChanges("#000");
            // navigationUtil.goPage(this.props, "DetailPage");
          }}
        /> */}
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
  num:state.theme.num
});
const mapDispatchToProps = dispatch => ({

  onThemeChanges: theme => dispatch(onThemeChange(theme))
});
export default connect(mapStateToProps, mapDispatchToProps)(VideoPage);
