import { NavigationContainerRef } from '@react-navigation/native';

let _navigationContainer: NavigationContainerRef;

function setTopLevelNavigator(navigatorRef) {
  _navigationContainer = navigatorRef;
}

// add other navigation functions that you need and export them

export default {
  appContainer: _navigationContainer,
  setTopLevelNavigator,
};
