import {
  TouchableWithoutFeedbackProps,
  Platform,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";

import React from "react";

const TouchableComponent: React.FC<TouchableWithoutFeedbackProps> = (props) => {
  const { children, style, ...other } = props;
  return Platform.select({
    ios: (
      <TouchableOpacity style={style} {...other}>
        <React.Fragment>{children}</React.Fragment>
      </TouchableOpacity>
    ),
    android: (
      <TouchableNativeFeedback {...other}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    ),
  });
};
export default TouchableComponent;
const styles = StyleSheet.create({});
