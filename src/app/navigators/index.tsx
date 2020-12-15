import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {Screens} from '../../utils/Routes'

import {Repo,Star} from '../../modules/Authen'
const Stack = createStackNavigator();

 const AppStack = () => {
    return(
        <Stack.Navigator initialRouteName={Screens.Repo} headerMode="none">
              <Stack.Screen
                name={Screens.Repo}
                component={Repo}
                key={Screens.Repo}
                options={{ gestureEnabled: false }}
              />
              <Stack.Screen
                name={Screens.Star}
                component={Star}
                key={Screens.Star}
                options={{ gestureEnabled: false }}
              />
              
            </Stack.Navigator>
       
    )
}

export default AppStack