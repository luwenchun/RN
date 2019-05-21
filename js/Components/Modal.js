
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Modal,
  PixelRatio,
  View,
  Image
} from 'react-native';
 
 
class ModalDemo extends Component {
 
  constructor(props) {
    super(props);//这一句不能省略，照抄即可
    this.state = {
      animationType: 'none',//none slide fade
      transparent: true,//是否透明显示
    };
  }
  

  render() {
    //   声明模态框样式
    let modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.6)' : 'red',
    };
    let innerContainerTransparentStyle = this.state.transparent
      ? { backgroundColor: '#fff', padding: 20 }
      : null;
    // 声明props
    let { goods } = this.props
        console.log('render modal',goods)
        if(!goods){
            return null;
        }
    return (
 
      <View style={{ alignItems: 'center', flex: 1 }}>
        <Modal
          animationType={this.state.animationType}
          transparent={this.state.transparent}
          visible={this.props.modalVisible}
          onRequestClose={this.props.setModalVisible.bind(this,false)}
          onShow={this.props.startShow}
          >
          <View style={[styles.container, modalBackgroundStyle]}>
            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
              {/* <Text style={styles.date}>2018-10-12</Text>
              <View style={styles.row}>
                <View style={styles.rowTitle}>
                  <Text style={styles.station}>长沙站</Text>
                  <Text style={styles.mp10}>8: 00出发</Text>
                </View>
                <View style={styles.rowTitle}>
                  <View style={styles.at}></View>
                  <Text style={[styles.mp10, { textAlign: 'center' }]}>G888</Text>
                </View>
                <View style={styles.rowTitle}>
                  <Text style={[styles.station, { textAlign: 'right' }]}>北京站</Text>
                  <Text style={[styles.mp10, { textAlign: 'right' }]}>18: 00抵达</Text>
                </View>
              </View>
              <View style={styles.mp10}>
                <Text>票价：￥600.00元</Text>
                <Text>乘车人：东方耀</Text>
                <Text>长沙站 火车南站 网售</Text>
              </View>
              <View style={[styles.mp10, styles.btn, { alignItems: 'center' }]}>
                <Text style={styles.btn_text}>去支付</Text>
              </View> */}
              <View styles={styles.dialog}>
                   
                    {goods.imageUrl?<Image style={styles.Images} source={{uri:goods.imageUrl, cache: 'only-if-cached'}} />:
                                  <Image style={styles.Images} source={require("../img/2V0w13000000vkbetD598_D_296_197.png")} />
                    }
                
                    <View style={[styles.rightitem]}>
                      <Text >{goods.title}</Text>
                      <Text >{goods.price}</Text>
                      {/* <Text >{goods.subtitle}</Text> */}
                    </View>
              </View>
              <Text
                onPress={this.props.setModalVisible.bind(this,false) }
                style={[styles.close,{fontSize:20,marginTop:0}]}>
                X
              </Text>
            </View>
          </View>
        </Modal>
            {/* 使用demo */}
          {/* <Text style={{ fontSize: 30,color:'red' }}  onPress={this._setModalVisible.bind(this, true) }>预定火车票</Text> */}
 
 
      </View>
    );
  }
 

 
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    // flex:1,
    flexGrow:0,
    flexShrink:1,
    flexBasis:"auto",
    marginTop:20,
    marginBottom: 20,
  },
  rowTitle: {
    flex: 1,
    height:20,
    fontWeight: 'bold',
  },
    station: {
    fontSize: 20
  },
  mp10: {
    marginTop: 5,
  },
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
  },
//   buttonText: {
//     fontSize: 18,
//     margin: 5,
//     textAlign: 'center',
//   },
 
  close: {
    flex: 1,
    position: 'absolute',
    // bottom: 0,
    // left: 0,
    right: 0,
    top: 0,
  },
  zhifu: {
    height: 150,
  },
 
  flex: {
    flex: 1,
  },
  at: {
    borderWidth: 1 / PixelRatio.get(),
    width: 80,
    marginLeft:10,
    marginRight:10,
    borderColor: '#18B7FF',
    height: 1,
    marginTop: 0
  },
  date: {
    textAlign: 'center',
    marginBottom: 5
  },


  btn: {
    width: 60,
    height: 30,
    borderRadius: 3,
    backgroundColor: '#FFBA27',
    padding: 5,
  },
//   btn_text: {
//     lineHeight: 18,
//     textAlign: 'center',
//     color: '#fff',
//   },
// 模态框图片
dialog:{
    flexDirection: 'row',
    flexWrap: 'wrap-reverse',
    flex:1,
    // margin: 10,
},
Images:{
    width:100,
    height:100,
    resizeMode:"cover",
    borderTopRightRadius:30,//ios不兼容
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 100,
},
rightitem:{
   flexDirection: 'column',
    // height:100,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    flexWrap: 'nowrap',
}
});

export default ModalDemo

