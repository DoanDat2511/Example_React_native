import React, { ReactNode, useCallback, useMemo, Fragment } from "react";
import {
  View,
  StyleSheet,
  Image,
  GestureResponderEvent,
  ImageSourcePropType,
  ViewProps,
  Keyboard,
  StyleProp,
  TextStyle,
  Platform,
  ViewStyle,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Text,
} from "react-native";
import { NavigationScreenProp } from "react-navigation";
import TouchableComponent from "./Button";
import Colors from "../utils/Colors";
const { width } = Dimensions.get("window");
const NAV_HEIGHT = Platform.select({
  ios: 44,
  android: 50,
});
interface IProps extends ViewProps {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  navigation?: NavigationScreenProp<any>;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
  headerCenter?: ReactNode;
  btnIconLeft?: ImageSourcePropType;
  btnIconRight?: ImageSourcePropType;
  borderBottom?: boolean;
  titleContainerStyle?: StyleProp<ViewStyle>;
  onBack?: (e?: any) => void;
  onNavigationRightClicked?: (e?: GestureResponderEvent) => void;
  noImageBackground?: boolean;
  backgroundColor?: string;
}
const Header: React.FC<IProps> = (props) => {
  const {
    title,
    titleStyle,
    style,
    navigation,
    onBack,
    headerLeft,
    headerRight,
    headerCenter,
    btnIconLeft,
    btnIconRight,
    onNavigationRightClicked,
    titleContainerStyle,
    children,
    backgroundColor,
    ...other
  } = props;
  const onNavigateBack = useCallback(() => {
    onBack && onBack();
    navigation && navigation.goBack();
    Keyboard.dismiss();
  }, [navigation, onBack]);
  const _onHeaderRightClicked = useCallback(() => {
    onNavigationRightClicked && onNavigationRightClicked();
  }, [onNavigationRightClicked]);
  const headerLeftComponent = useMemo(() => {
    if (headerLeft) {
      return headerLeft;
    }
    if (btnIconLeft) {
      return (
        <TouchableComponent
          onPress={onNavigateBack}
          style={styles.button}
          testID="headerGoBack"
        >
          <Image source={btnIconLeft} resizeMode="contain" />
        </TouchableComponent>
      );
    }
    return headerLeft === null ? null : <View style={styles.button} />;
  }, [headerLeft, onNavigateBack, btnIconLeft]);
  const headerRightComponent = useMemo(() => {
    if (headerRight) {
      return headerRight;
    }
    if (btnIconRight) {
      return (
        <TouchableComponent
          onPress={_onHeaderRightClicked}
          style={styles.button}
        >
          <Image
            style={styles.root}
            source={btnIconRight}
            resizeMode="contain"
          />
        </TouchableComponent>
      );
    }
    return headerRight === null ? null : <View style={styles.button} />;
  }, [headerRight, btnIconRight]);
  const headerCenterComponent = useMemo(() => {
    return (
      <View style={[styles.titleContainer, titleContainerStyle]}>
        {headerCenter ? (
          headerCenter
        ) : (
          <Text style={[styles.titleHeader, titleStyle]}>{title}</Text>
        )}
      </View>
    );
  }, [title, headerCenter, titleStyle]);
  const borderBottom = useMemo(
    () => (props.borderBottom ? <View style={styles.borderBottom} /> : null),
    [props.borderBottom]
  );
  const headerStyle = useMemo(() => {
    return [styles.header, style];
  }, [style]);
  return (
    <Fragment>
      <SafeAreaView
        style={{ backgroundColor: backgroundColor || Colors.DARK_BLUE }}
      >
        <StatusBar barStyle="light-content" />
        <View style={headerStyle} {...other}>
          {headerCenterComponent}
          {headerLeftComponent}
          {headerRightComponent}
          {borderBottom}
        </View>
      </SafeAreaView>
      {children}
    </Fragment>
  );
};
export default Header;
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    width: "100%",
  },
  titleContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  titleHeader: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: NAV_HEIGHT,
    backgroundColor: "transparent",
    color: "white",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "transparent",
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "space-between",
    height: NAV_HEIGHT,
    width: "100%",
  },
  button: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  textWhite: {
    color: "white",
  },
  imageBG: {
    width: "100%",
    height: width * 0.45,
  },
  headerContainer: {
    width: "100%",
    alignItems: "center",
  },
  headerBottom: {
    width: "100%",
    height: 80,
  },
  borderBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
  },
});
