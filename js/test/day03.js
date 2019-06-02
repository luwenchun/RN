import React,{ Component } from 'react';
import { Platform,Animated,Easing,Image,RefreshControl,ScrollView,StatusBar,StyleSheet,Text,TouchableHighlight,TouchableOpacity,View } from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from "react-native-underline-tabbar";
import PropTypes from 'prop-types'

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class Entrance extends Component{
    static propTypes = {
      hideThis: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.state = {
           transformAnim: new Animated.Value(1), // 过渡初始值设为0
           opacityAnim: new Animated.Value(1), // 透明度初始值设为0
         };
      }

      componentDidMount() {
        Animated.timing(          // 随时间变化而执行动画
           this.state.transformAnim,       // 动画中的变量值
           {toValue: 50,    // 透明度最终变为1，即完全不透明
            duration: 1200,   // 让动画持续一段时间
            delay:2000,      //开始动画前的延迟时间（毫秒）。默认为 0.
            easing: Easing.elastic(2), //缓动函数。 默认为Easing.inOut(Easing.ease)。
          },          
        ).start();
        Animated.timing(         
           this.state.opacityAnim,    
           {toValue: 0,
            duration: 800,
            easing: Easing.elastic(1),
            delay:2200,
          },          
         ).start();
        setTimeout(() => {
          this.props.hideThis();
        }, 3300);              
      }

      render () {
        return(
          <Animated.View style={[styles.entrance,{opacity:this.state.opacityAnim}]}>
            <AnimatedIcon size={60} style={[styles.twitter,{transform:[{scale:this.state.transformAnim}]}]} name="logo-twitter"></AnimatedIcon>
          </Animated.View>
        )
      }

}
class TwitterPost extends Component{
    constructor() {
      super();
      this.state = {
        isRefreshing: false,
      };
    }
  
    _onRefresh() {
      this.setState({
        isRefreshing: true,
      });
      setTimeout(() => {
        this.setState({
          isRefreshing: false,
        });
      }, 1000);
    }
  
    render() {
      return(
        <ScrollView
           refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={()=>this._onRefresh()}
              tintColor="#ddd"/>}>
              <Image source={require('./img/w3.png')} style={{width:Util.size.width, height:Util.size.height-110}}></Image>
        </ScrollView>
      )
    }
  }
  class TwitterFlow extends Component{
    render() {
      return(
        <View>
          <View style={styles.nav}>
            <View style={styles.navLeft}>
              <Icon name="ios-person-add" size={23} style={{color:"#1b95e0", paddingLeft:10}}></Icon>
            </View>
            <View style={styles.navMid}>
              <Icon name="logo-twitter" size={27} style={{color:"#1b95e0"}}></Icon>
            </View>
            <View style={styles.navRight}>
              <Icon name="ios-search" size={23} style={{color:"#1b95e0", width:30}}></Icon>
              <Icon name="ios-create-outline" size={23} style={{color:"#1b95e0", width:30, paddingRight:10}}></Icon>
            </View>
          </View>
          <TwitterPost></TwitterPost>
        </View>
      )
    }
  }

//   const FacebookTabBar = React.createClass({
    class FacebookTabBar extends Component{
        static  propTypes= {
            goToPage: PropTypes.func,
            activeTab: PropTypes.number,
            tabs: PropTypes.array,
        };
        constructor(props){
            super(props)
            this.state={
                tabIcons: [],
            }
        }
            
        
  
        
        componentDidMount() {
            setTimeout( () => this.props.goToPage(0), 0 );
            this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
        }
        
        setAnimationValue({ value, }) {
            this.tabIcons.forEach((icon, i) => {
                const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
                icon.setNativeProps({
                    style: {
                        color: this.iconColor(progress),
                    },
                });
            });
        }
        
            //color between rgb(59,89,152) and rgb(204,204,204)
        iconColor(progress) {
            const red = 49 + (159 - 49) * progress;
            const green = 149 + (159 - 149) * progress;
            const blue = 215 + (159 - 215) * progress;
            return `rgb(${red}, ${green}, ${blue})`;
        }
        
        render() {

            return <View style={[styles.tabs, this.props.style, ]}>
                {this.props.tabs.map((tab, i) => {
                return <TouchableOpacity key={tab} onPress={() => setTimeout( () => this.props.goToPage(i), 0 )} style={styles.tab}>
                        <Icon
                        name={tab}
                        size={30}
                        color={this.props.activeTab === i ? 'rgb(49,149,215)' : 'rgb(159,159,159)'}
                        ref={(icon) => { this.tabIcons[i] = icon; }}
                        />
                        </TouchableOpacity>;
                 })
                }
            </View>;
            }

        }
//   });

  class TwitterTab1 extends Component{
    constructor() {
      super();
      this.state = {
        selectedTab:'主页',
        title:'主页',
      };
    }
  
    changeTab(tabName) {
        this.setState({
          selectedTab: tabName
        });
    }
  
    _updateTitle(obj) {
      const {i} = obj;
      let title = "";
      switch(i) {
        case 0:
          title = "主页";
          break;
        case 1: 
          title = "通知";
          break;
        case 2: 
          title = "私信";
          break;
        case 3: 
          title = "我";
          break;
      }
      this.setState({
        title
      });
    }
  
    render(){
      const iosTabView =
      <TwitterFlow/>
      
    //    <TabBarIOS
    //         barTintColor="#fff"
    //         tintColor="#1b95e0">
    //       <Icon.TabBarItem
    //         title="主页"
    //         iconName="ios-home-outline"
    //         selectedIconName="ios-home"
    //         onPress={ () => this.changeTab('主页') }
    //         selected={ this.state.selectedTab === '主页' }>
    //         <TwitterFlow/>
    //       </Icon.TabBarItem>
    //       <Icon.TabBarItem
    //         title="通知"
    //         iconName="ios-notifications-outline"
    //         selectedIconName="ios-notifications"
    //         onPress={ () => this.changeTab('通知') }
    //         selected={ this.state.selectedTab === '通知'}>
    //         <TwitterFlow/>
    //       </Icon.TabBarItem>
    //       <Icon.TabBarItem
    //         title="私信"
    //         iconName="ios-mail-outline"
    //         selectedIconName="ios-mail"
    //         onPress={ () => this.changeTab('私信') }
    //         selected={ this.state.selectedTab === '私信'}>
    //         <TwitterFlow/>
    //       </Icon.TabBarItem>
    //       <Icon.TabBarItem
    //         title="我"
    //         iconName="ios-person-outline"
    //         selectedIconName="ios-person"
    //         onPress={ () => this.changeTab('我') }
    //         selected={ this.state.selectedTab === '我'}>
    //         <TwitterFlow/>
    //       </Icon.TabBarItem>
    //     </TabBarIOS>;
      const androidTabView =   
          <View>
            <View style={styles.navBg}></View>
            <View style={styles.navAndroid}>
              <View style={styles.logoContainer}>
                <Icon name="logo-twitter" color="#fff" size={27}/>
                <Text style={styles.title}>{this.state.title}</Text>
              </View>
              <View style={styles.iconContainer}>
                <Icon name="ios-search" color="#fff" size={25}/>
                <Icon name="ios-create-outline" color="#fff" size={25}/>
              </View>
            </View>
            <ScrollableTabView
              onChangeTab={(obj) => this._updateTitle(obj)}
              renderTabBar={() => <FacebookTabBar />}>
              <TwitterPost tabLabel="ios-home" />
              <TwitterPost tabLabel="ios-notifications" />
              <TwitterPost tabLabel="ios-mail" />
              <TwitterPost tabLabel="ios-person" />
            </ScrollableTabView>
          </View>;
      return Platform.OS === "ios"? <FacebookTabBar/>:androidTabView
    //   iosTabView:androidTabView;
    }
  }

  const Page = ({label}) => (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        {label}
      </Text>
      <Text style={styles.instructions}>
        To get started, edit index.ios.js
      </Text>
      <Text style={styles.instructions}>
        Press Cmd+R to reload,{'\n'}
        Cmd+D or shake for dev menu
      </Text>
    </View>
);

const iconsSet = {
    hot: require('./img/1.jpg'),
    trending: require('./img/2.png'),
    fresh: require('./img/3.jpg'),
    funny: require('./img/4.jpg'),
    movieAndTv: require('./img/5.jpg'),
    sport: require('./img/w2.png'),
  };
  

  const Tab = ({ tab, page, isTabActive, onPressHandler, onTabLayout, styles }) => {
    const { label, icon } = tab;
    const style = {
      marginHorizontal: 20,
      paddingVertical: 10,
    };
    const containerStyle = {
      paddingHorizontal: 20,
      paddingVertical: 5,
      borderRadius: 25,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: styles.backgroundColor,
      opacity: styles.opacity,
      transform: [{ scale: styles.opacity }],
    };
    const textStyle = {
      color: styles.textColor,
      fontWeight: '600',
    };
    const iconStyle = {
      tintColor: styles.textColor,
      resizeMode: 'contain',
      width: 22,
      height: 22,
      marginLeft: 10,
    };
    return (
      <TouchableOpacity style={style} onPress={onPressHandler} onLayout={onTabLayout} key={page}>
        <Animated.View style={containerStyle}>
          <Animated.Text style={textStyle}>{label}</Animated.Text>
          <Animated.Image style={iconStyle} source={icon} />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  class TwitterTabs extends Component {
    _scrollX = new Animated.Value(0);
    // 6 is a quantity of tabs
    interpolators = Array.from({ length: 6 }, (_, i) => i).map(idx => ({
      scale: this._scrollX.interpolate({
        inputRange: [idx - 1, idx, idx + 1],
        outputRange: [1, 1.2, 1],
        extrapolate: 'clamp',
      }),
      opacity: this._scrollX.interpolate({
        inputRange: [idx - 1, idx, idx + 1],
        outputRange: [0.9, 1, 0.9],
        extrapolate: 'clamp',
      }),
      textColor: this._scrollX.interpolate({
        inputRange: [idx - 1, idx, idx + 1],
        outputRange: ['#000', '#fff', '#000'],
      }),
      backgroundColor: this._scrollX.interpolate({
        inputRange: [idx - 1, idx, idx + 1],
        outputRange: ['rgba(0,0,0,0.1)', '#000', 'rgba(0,0,0,0.1)'],
        extrapolate: 'clamp',
      }),
    }));
    render() {
      return (
        <View style={[styles.container, { paddingTop: 20 }]}>
          <ScrollableTabView
            renderTabBar={() => (
              <TabBar
                underlineColor="#000"
                tabBarStyle={{ backgroundColor: "#fff", borderTopColor: '#d2d2d2', borderTopWidth: 1 }}
                renderTab={(tab, page, isTabActive, onPressHandler, onTabLayout) => (
                  <Tab
                    key={page}
                    tab={tab}
                    page={page}
                    isTabActive={isTabActive}
                    onPressHandler={onPressHandler}
                    onTabLayout={onTabLayout}
                    styles={this.interpolators[page]}
                  />
                )}
              />
            )}
            onScroll={(x) => this._scrollX.setValue(x)}
          >
            <Page tabLabel={{label: "Hot", icon: iconsSet.hot}} label="Page #1 Hot" text="You can pass your own views to TabBar!"/>
            <Page tabLabel={{label: "Trending", icon: iconsSet.trending}} label="Page #2 Trending" text="Yehoo!!!"/>
            <Page tabLabel={{label: "Fresh", icon: iconsSet.fresh}} label="Page #3 Fresh" text="Hooray!"/>
            <Page tabLabel={{label: "Funny", icon: iconsSet.funny}} label="Page #4 Funny"/>
            <Page tabLabel={{label: "Movie & TV", icon: iconsSet.movieAndTv}} label="Page #5 Movie & TV"/>
            <Page tabLabel={{label: "Sport", icon: iconsSet.sport}} label="Page #6 Sport"/>
          </ScrollableTabView>
        </View>
      );
    }
  }

class TwitterTab extends Component {
  render() {
    return (
        <View style={[styles.container, {paddingTop: 30}]}>
          <ScrollableTabView
              tabBarActiveTextColor="#53ac49"
              renderTabBar={() => <TabBar underlineColor="#53ac49" />}>
            <Page tabLabel={{label: "Page #1"}} label="Page #1"/>
            <Page tabLabel={{label: "Page #2 aka Long!", badge: 3}} label="Page #2 aka Long!"/>
            <Page tabLabel={{label: "Page #3"}} label="Page #3"/>
            <Page tabLabel={{label: "Page #4 aka Page"}} label="Page #4 aka Page"/>
            <Page tabLabel={{label: "Page #5"}} label="Page #5"/>
          </ScrollableTabView>

        </View>
    );
  }
}

  export default class extends Component{
    constructor() {
      super();
      this.state = {
        show:true
      };
    }
  
    componentDidMount() {
      if(Platform.OS === "ios") {
        StatusBar.setBarStyle(0);
      }
    }
  
    _hideEntrance() {
      this.setState({
        show:false
      })
    }
  
      render() {
      let entrance = this.state.show? <Entrance hideThis={()=> this._hideEntrance()}/>:<View></View>
          return(
              <View style={styles.twitterContainer}>
          <TwitterTab/>
          {entrance}
        </View>
          )
      }
  }
  
  
  
  
  
const styles = StyleSheet.create({
    itemWrapper:{
      backgroundColor: '#fff'
    },
    twitterContainer:{
      width: Util.size.width,
      height: Util.size.height
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
      },
      instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        fontSize: 28,
      },
    entrance:{
      position: "absolute",
      top:0, left:0,
      height: Util.size.height,
      width: Util.size.width,
      backgroundColor:"#1b95e0",
      alignItems:"center",
      justifyContent:"center"
    },
    twitter:{
      color:"#fff",
      position:"relative",
      top: -20,
      textAlign: "center"
    },
    nav:{
      flexDirection: "row",
      paddingTop: 30,
      borderBottomWidth: Util.pixel,
      borderBottomColor: "#ddd",
      paddingBottom:5,
      backgroundColor:"#fff"
    },
    navLeft:{
      flex:1,
      alignItems:"flex-start",
      justifyContent:"center",
    },
    navMid:{
      flex:1,
      alignItems:"center",
      justifyContent:"center",
    },
    navRight:{
      flex:1,
      justifyContent:"flex-end",
      alignItems:"center",
      flexDirection:"row"
    },
    twitterPostContainer:{
      width: Util.size.width,
      height:Util.size.height-90,
      position:"relative",
      top:-20
    },
    navAndroid:{
      backgroundColor:"#3195d7",
      width:Util.size.width,
      height:55,
      flexDirection:"row",
      justifyContent:"space-between",
      paddingTop:15,
      paddingLeft:20,
      paddingRight:10,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 10,
    },
    tabs: {
      height: 45,
      flexDirection: 'row',
      paddingTop: 5,
      borderWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomColor: 'rgba(0,0,0,0.05)',
      backgroundColor:"#111"
    },
    icon: {
      position: 'absolute',
      top: 0,
      left: 35,
    },
    img: {
      width:375,
      height: 550,
    },
    title:{
      color:"#fff",
      fontSize:20,
      paddingLeft: 10
    },
    iconContainer:{
      flexDirection:"row",
      justifyContent:"space-between",
      width:60,
    },
    logoContainer:{
      flexDirection:"row",
      justifyContent:"flex-start",
    },
    tabView: {
      flex: 1,
      height: 500,
      padding: 10,
      backgroundColor: 'rgba(0,0,0,0.01)',
    },
  });