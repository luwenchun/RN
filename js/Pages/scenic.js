import React, { Component } from "react";
import { Image, Button, Platform, StyleSheet, Text, FlatList,View,SectionList,ActivityIndicator,TouchableOpacity } from "react-native";

import { connect } from "react-redux";
import { onThemeChange } from "../Actions/theme";
import navigationUtil from "../Navigator/navigationUtil";
function RenderItem(props){
  return(
       <View style={styles.container}>
        {props.data.map((item,index)=>{
            return (
              
                <View style={styles.newitem}>
                 <Image source={{uri:item.thumbnail_pic_s02}} style={styles.imageStyle}/>
                 <View style={styles.rightStyle}>
                   <Text style={styles.titleStyle}  selectable>{item.title}</Text>
                   <Text style={styles.priceStyle}>{item.date}</Text>
                 </View>
                </View>
            )
        })}
        </View>
       
    )
}
function RenderItemFlatList(datavalue){
  var data=datavalue.data
  // var _this=this;
  // renderItem={ ({item}) => <Text style={styles.item}>{item.title}</Text>}
  return(
  <View style={styles.container}>
  {/* 类似电话薄分组 */}
  {/* <SectionList
          sections={[
            {title: 'D', data: ['Devin']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        /> */}
       <FlatList
          ItemSeparatorComponent={()=>{
          return  <View style={{height:5,backgroundColor:'#ccc'}}></View>
          }}
          data={data}
          renderItem={ ({item,index}) =>
          <View style={styles.newitem}>
              <View style={[styles.imageStyle]}>
                {item.firstImg?<Image source={{uri:item.firstImg, cache: 'only-if-cached'}} />:
                              <Image source={require("../img/2V0w13000000vkbetD598_D_296_197.png")} style={styles.imageStyle}/>
                }
              </View>
                {/* 点击跳转 */}
                {/* onPress={this.Pressdetail.bind(this,item)} */}
                {/* onPress={(item)=>this.Pressdetail(item)} */}
                <TouchableOpacity  onPress={this.Pressdetail.bind(this,item.url)} style={styles.rightStyle} >
                    
                      <Text style={styles.titleStyle}  numberOfLines={2} ellipsizeMode="tail" selectable>{item.title}</Text>
                      <View style={styles.author}>
                        <Text >{item.author_name}</Text>
                    </View>
                      <View style={styles.titledesc}>
                        
                      <Text style={styles.priceStyle}  numberOfLines={1} ellipsizeMode="tail">{item.date}</Text>
                      </View>
                  
                </TouchableOpacity>
          </View>
        }
        />
        </View>
  )
}
Pressdetail=(url)=>{
    navigationUtil.goPage({...this.props,url:url}, "DetailPage");
}

Item=(data)=>{
  const {item,index}=data;

  return(
              <View style={styles.newitem}>
              {
               item.firstImg&&<Image source={{uri:item.firstImg}} style={styles.imageStyle}/>
              }
              
               <View style={styles.rightStyle}>
                 <Text style={styles.titleStyle}  numberOfLines="2" ellipsizeMode="tail" selectable>{item.title}</Text>
                  <View style={styles.titledesc}>
                     <Text style={styles.priceStyle}  numberOfLines="3" ellipsizeMode="tail">{item.url}</Text>
                  </View>
               </View>
              </View>
  )
}

class IndexTab extends Component {
  constructor(props){
    super(props)
    this.state={
      bookinfo:null,
      type:"top",//默认头条
      pno:2,
      ps:30,
      dtype:"json",
      key:"173e0ec3e304227fa4564ecb246be0e5",//新闻
      key1:'20f14c3e2b76fa51474f9714e3142351',//微信精选
    }
  }
  componentDidMount=()=>{
    this.fetchBookinfoList()
  }
  fetchBookinfoList=()=>{
   
    const {pno,ps,dtype,type,key,key1}=this.state;
    // const  url=`http://v.juhe.cn/toutiao/index?type=${type}&key=${key}`;
    // const url1= `http://v.juhe.cn/weixin/query?pno=${pno}&ps=${ps}&dtype=${dtype}&key=${key1}`

    const url1= `https://www.easy-mock.com/mock/5ce12a42fd883078f2906591/api/weixin/query`
    fetch(url1)
    .then((Response)=>Response.json())
    .then((Response)=>{
      let bookinfo=Response.result.data;
      this.setState({
        bookinfo:bookinfo
      })
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  // renderItem=(data)=>{
  //   return (
  //     <View style={styles.container}>
  //     {
  //       data.map((item,index)=>{
  //         return (
  //                <View style={styles.newitem}>
  //                 <Image source={{uri:item.thumbnail_pic_s02}} style={styles.imageStyle}/>
  //                 <View style={styles.rightStyle}>
  //                   <Text style={styles.titleStyle}>{item.title}</Text>
  //                   <Text style={styles.priceStyle}>{item.date}</Text>
  //                 </View>
  //                </View>
  //         )
  //       })
  //     }
      
        
  //     </View>
  //   )
  // }
  render() {
    var item=this.state.bookinfo
    if(item){
      return (
        // <RenderItem data={item} />
        <RenderItemFlatList data={item}/>
      )
      
      // this.renderItem(item);
    }else{
      return (
        <View style={styles.loadview}>
            <Text style={styles.loading}>加载中1.....</Text>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
      
      )
    }
  
  }
}

const styles = StyleSheet.create({
  container: {
   backgroundColor:"white",
   flex:1,
  },
  loadview:{
    flex:1,//告诉容器全屏
    alignItems: 'center',
    justifyContent:'center',
    // borderWidth:2,
    // borderColor: "red",
    
  },
  loading:{
    fontSize: 16,
  },
  newitem:{
    flexDirection: 'row',
    margin: 10,
  },

  imageStyle:{
    width:100,
    height:100,
    resizeMode:"cover",
    borderTopRightRadius:30,//ios不兼容
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 100,
  },
  rightStyle:{
    flexDirection: 'column',
    height:100,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
  },
  titleStyle:{
    fontSize: 16,
    color:'black',
    marginTop: 10,
    marginBottom: 10,
  },
  author:{
    flex:1,
    alignItems: 'flex-end',
    justifyContent:"flex-end",
  },
  titledesc:{
    flex:1,
    justifyContent:"flex-end",
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  priceStyle:{
    color:"gray",
    fontSize:16,
  },

});
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(onThemeChange(theme))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexTab);
