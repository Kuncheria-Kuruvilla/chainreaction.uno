import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import GameBoard from '../GameBoard/GameBoard';
import rootReducer from '../../reducers';
import './App.css';
import GameOptions from '../GameOptions/GameOptions';

function App() {
  const store = createStore(
    rootReducer,
    {},
    compose(applyMiddleware(reduxThunk))
  );
  return (
    <Provider store={store}>
      <GameOptions />
      <GameBoard />
    </Provider>
  );
}

export default App;
