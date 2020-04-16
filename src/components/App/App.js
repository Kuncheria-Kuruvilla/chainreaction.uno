import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import GameBoard from '../GameBoard/GameBoard';
import rootReducer from '../../reducers';
import './App.css';

function App() {
  const store = createStore(
    rootReducer,
    {},
    compose(
      applyMiddleware(reduxThunk),
      process.env.NODE_ENV !== 'production' &&
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
  return (
    <Provider store={store}>
      <GameBoard />
    </Provider>
  );
}

export default App;
