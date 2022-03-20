import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {store} from "./App/store";
import {Provider} from "react-redux";
import App from "./App/App";


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root'));


serviceWorker.unregister();
