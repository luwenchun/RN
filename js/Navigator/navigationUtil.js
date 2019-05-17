export default class NavigationUtil {
  static goPage(props, page) {
    const navigation = NavigationUtil.navigation;
    navigation.navigate(page, {
      ...props
    });
  }

  static resetGoBack(props) {
    const { navigation } = props;
    navigation.goBack();
  }

  static resetToHomePage(params) {
    const { navigation } = params;
    navigation.navigate("Main");
  }
}
