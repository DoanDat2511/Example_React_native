import React from 'react';
import {Provider} from 'react-redux';

import AppContainer from './src/AppContainer'
import configureStore from './src/app/store'

const store = configureStore()
const App = () => {
  return (
    <Provider store={store}>
      <AppContainer/>
    </Provider>
  );
};

export default App;
