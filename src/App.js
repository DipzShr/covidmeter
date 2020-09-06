import React from 'react';
import logo from './logo.svg';
import MainView from './views/MainView';

import {Provider} from 'react-redux';
import configureStore from './store';
const store = configureStore();

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <MainView />
      </Provider>
    </div>
  );
}

export default App;
