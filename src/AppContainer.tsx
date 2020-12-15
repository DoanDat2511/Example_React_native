import React, {useCallback, useState, useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import ErrorBoundary from 'react-native-error-boundary';

import navigationService from './common/navigation-service';
import AppStack from './app/navigators';

import ErrorBoundary from "./modules/ErrorBoundary"
const AppContainer: React.FC = (props) => {
  const [visible, setVisible] = useState(false);



  const _updateNavigator = useCallback((navigatorRef) => {
    navigationService.setTopLevelNavigator(navigatorRef);
  }, []);
  
  const NavigationView = useMemo(() => {
    return (
      <NavigationContainer ref={_updateNavigator}>
        <AppStack />
      </NavigationContainer>
    );
  }, [_updateNavigator]);
  return (
    <React.Fragment>
      <ErrorBoundary>{NavigationView}</ErrorBoundary>
    </React.Fragment>
  );
};

export default AppContainer;
