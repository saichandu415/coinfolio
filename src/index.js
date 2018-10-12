import React from 'react';
import ReactDOM from 'react-dom';
import reducer from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

export const store = createStore(
    reducer
);

ReactDOM.render(
    <Provider store={store}> 
        <App/>
    </Provider>
    , document.getElementById('root'));
serviceWorker.unregister();
