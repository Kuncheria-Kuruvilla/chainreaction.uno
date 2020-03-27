import React from "react";
import { Provider } from 'react-redux'
import { createStore } from "redux";

import GameBoard from "../GameBoard/GameBoard";
import rootReducer from '../../reducers'
import "./App.css";
import GameOptions from "../GameOptions/GameOptions";

function App() {
  const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  return (
    <Provider store={store}>
      <GameOptions/>
      <GameBoard/>
    </Provider>
  );
}

export default App;
