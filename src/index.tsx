import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {store} from "./App/store";
import {Provider} from "react-redux";
import App from "./App/App";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>

    </React.StrictMode>, document.getElementById('root'));

serviceWorker.unregister();
