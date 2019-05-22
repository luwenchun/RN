import React, { Component } from "react";
import { Image, Button, Platform, StyleSheet ,Text, View } from "react-native";

import { connect } from "react-redux";
import { onThemeChange } from "../Actions/theme";
import navigationUtil from "../Navigator/navigationUtil";
import RefreshListView, {RefreshState} from "react-native-refresh-list-view"
import Cell from '../Components/Cell'//食物卡片
import testData from '../common/data'
import Dialog from '../Components/Modal'//模态框卡片
class IndexTab extends Component {
  state:{
    dataList:Array<any>,
    refreshState:number,
  }
  constructor(props) {
    super(props);
    this.state={
      dataList: [],
      refreshState: RefreshState.Idle,
       modalVisible: false,//模态场景是否可见
       goods:{
         imageUrl: "",
          price: 10,
          subtitle: "[150店通用]卤肉饭+乌龙茶（小）1份",
          title: "吉野家",
       }
    }
  }
  componentDidMount() {
    this.onHeaderRefresh()
  }
  // 模态框function
  setModalVisible = (visible,item) => {
   
    this.setState({ modalVisible: visible,goods:item });
  }
 
  startShow=()=>{
    console.log('开始显示modal执行的函数');
  }
// 下拉列表function

  onHeaderRefresh = () => {
    this.setState({ refreshState: RefreshState.HeaderRefreshing })

    // 模拟网络请求
    setTimeout(() => {
      // 模拟网络加载失败的情况
      if (Math.random() < 0.2) {
        this.setState({ refreshState: RefreshState.Failure })
        return
      }

      //获取测试数据
      let dataList = this.getTestList(true)

      this.setState({
        dataList: dataList,
        refreshState: dataList.length < 1 ? RefreshState.EmptyData : RefreshState.Idle,
      })
    }, 2000)
  }
  onFooterRefresh = () => {
    this.setState({ refreshState: RefreshState.FooterRefreshing })

    // 模拟网络请求
    setTimeout(() => {
      // 模拟网络加载失败的情况
      if (Math.random() < 0.2) {
        this.setState({ refreshState: RefreshState.Failure })
        return
      }

      //获取测试数据
      let dataList = this.getTestList(false)//向数组里面增加

      this.setState({
        dataList: dataList,
        refreshState: dataList.length > 50 ? RefreshState.NoMoreData : RefreshState.Idle,
      })
    }, 2000)
  }

    // 获取测试数据
    getTestList(isReload: boolean): Array<Object> {
      let newList = testData.map((data) => {
        return {
          imageUrl: data.squareimgurl,
          title: data.mname,
          subtitle: `[${data.range}]${data.title}`,
          price: data.price,
        }
      })
      return isReload ? (Math.random() < 0.2 ? [] : newList) : [...this.state.dataList, ...newList]
    }
    keyExtractor = (item: any, index: number) => {
      return index.toString()
    }
  
    renderCell = (info: Object) => {
      return <Cell info={info.item}    setModalVisible={this.setModalVisible}  />
    }
 

  render() {
    const { tabName } = this.props;
    return (
      <View style={styles.container}>
     
        {/* <Text style={styles.welcome}>Welcome to {tabName}</Text> */}
        <RefreshListView
          data={this.state.dataList}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderCell}
          refreshState={this.state.refreshState}
          onHeaderRefresh={this.onHeaderRefresh}
          onFooterRefresh={this.onFooterRefresh}
        
          // 可选
          footerRefreshingText='玩命加载中 >.<'
          footerFailureText='我擦嘞，居然失败了 =.=!'
          footerNoMoreDataText='-我是有底线的-'
          footerEmptyDataText='-好像什么东西都没有-'
        />
        <Dialog  
        setModalVisible={this.setModalVisible} 
        startShow={this.startShow} 
        modalVisible={this.state.modalVisible}
        goods={this.state.goods}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == 'ios' ? 20 : 0,
  },
  title: {
    fontSize: 18,
    height: 84,
    textAlign: 'center'
  }
})
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(onThemeChange(theme))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexTab);
