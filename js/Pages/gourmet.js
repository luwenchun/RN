import React, { Component } from "react";
import { Image, Button, Platform, StyleSheet,  PixelRatio,ScrollView,Text,AppRegistry,TouchableNativeFeedback,TouchableWithoutFeedback,TouchableOpacity,Modal, View } from "react-native";
import ImageViewer from 'react-native-image-zoom-viewer';//图片预览
import ImagePicker from 'react-native-image-picker';//图片上传
import  { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'//原生下拉
// import   ActionSheet from 'react-native-actionsheet'//原生下拉
import { connect } from "react-redux";
import { onThemeChange } from "../Actions/theme";
import navigationUtil from "../Navigator/navigationUtil";
const images = [
  {
    url: "https://img.alicdn.com/tps/i4/TB1vDAJQ9zqK1RjSZPxSuw4tVXa.jpg",
    freeHeight: true
  },
  {
    url: "https://img.alicdn.com/tps/i4/TB1vDAJQ9zqK1RjSZPxSuw4tVXa.jpg",
    // props: {
    //   // headers: ...
    //   source: require('../img/2002050000000mb6q88DD_D_320_240.jpg')
    // },
    freeHeight: true
  }
];

// 定义下拉使用的
const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4
const options = [ 'Cancel', 'Apple', 'Banana', 'Watermelon', 'Durian' ]
const options2 = [
  'Cancel', 
  'Apple', 
  <Text style={{color: 'yellow'}}>Banana</Text>,
  'Watermelon', 
  <Text style={{color: 'red'}}>Durian</Text>
]
const title = 'Which one do you like ?'
const message = 'In botany, a fruit is the seed-bearing structure in flowering plants (also known as angiosperms) formed from the ovary after flowering.'

class IndexTab extends Component {
  constructor(props){
  super(props);
  this.state={
    index: 0,
    modalVisible: false,//图片预览模态框
    avatarSource: null,//上传头像
    videoSource: null,//视频资源
    selected: '',//原生下拉使用
  }
}
// 上传图片
selectPhotoTapped=()=> {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
     
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
        });
      }
    });
}

selectVideoTapped=()=> {
    const options = {
      title: 'Video Picker',
      takePhotoButtonTitle: 'Take Video...',
      mediaType: 'video',
      videoQuality: 'medium',
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          videoSource: response.uri,
        });
      }
    });
}

// 原生下拉使用

showActionSheet = () => {
  this.ActionSheet.show()
}

handlePress = (buttonIndex) => {
  this.setState({ selected: buttonIndex })
}
  render() {
    const { tabName } = this.props;
    return (
  <ScrollView>
      <View style={styles.container}>
 

      <Text>图片预览组件</Text>
       <TouchableOpacity  onPress={()=>this.setState({ modalVisible: !this.state.modalVisible })} style={styles.rightStyle} >
         <Image source={require("../img/2V0w13000000vkbetD598_D_296_197.png")}/>
      </TouchableOpacity>
        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          onRequestClose={this.close}
        >
      
      
          <ImageViewer
            imageUrls={images}
            index={this.state.index}
            onSwipeDown={() => {
              console.log('onSwipeDown');
            }}
            onMove={data => console.log(data)}
            enableSwipeDown={true}
            onDoubleClick	={()=>this.setState({ modalVisible: !this.state.modalVisible })}
          />
        
        </Modal>

       
        <Text>图片从本地上传组件需要真机</Text>
       
        <TouchableOpacity onPress={this.selectPhotoTapped}>
          <View
            style={[
              styles.avatar,
              styles.avatarContainer,
              { marginBottom: 20 },
            ]}
          >
            {this.state.avatarSource === null ? (
              <Text>Select a Photo</Text>
            ) : (
              <Image style={styles.avatar} source={this.state.avatarSource} />
            )}
          </View>
        </TouchableOpacity>
        <Text>视频从本地上传组件需要真机</Text>
        <TouchableOpacity onPress={this.selectVideoTapped}>
          <View style={[styles.avatar, styles.avatarContainer]}>
            <Text>Select a Video</Text>
          </View>
        </TouchableOpacity>

        {this.state.videoSource && (
          <Text style={{ margin: 8, textAlign: 'center' }}>
            {this.state.videoSource}
          </Text>
        )}
       
     <Text>原生下拉框子</Text>
     <View style={styles.wrapper}>
        <Text style={{marginBottom: 20}} >I like {options[this.state.selected] || '...'}</Text>
        <Text style={styles.button} onPress={this.showActionSheet}>Example A</Text>
        <ActionSheet
          ref={o => { this.ActionSheet = o }}
          title={title}
          message={message}
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress={this.handlePress}
        />
      
        <Text style={{marginBottom: 20}} >I like {options2[this.state.selected] || '...'}</Text>
        <Text style={styles.button} onPress={this.showActionSheet}>Example B</Text>
        <ActionSheet
          ref={o => { this.ActionSheet = o }}
          title={title}
          message={message}
          options={options2}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress={this.handlePress}
          styles={{messageBox: { height: 60 }}}
        />
      </View>
     
</View>
  </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingBottom:50,
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
   wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: 200,
    marginBottom: 10,
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#38f'
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
