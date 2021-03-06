// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import './index.css';
import './js/adaptive.js'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <HashRouter>
        <div style={{height:'100%'}}>
            <Route path = '/' component = {App}></Route>
        </div>
    </HashRouter>
), document.getElementById('root'));
registerServiceWorker();