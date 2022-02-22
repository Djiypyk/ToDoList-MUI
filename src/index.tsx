import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {store} from "./store/store";
import {Provider} from "react-redux";
import AppWithRedux from "./AppWithRedux";


ReactDOM.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>, document.getElementById('root'));


serviceWorker.unregister();
