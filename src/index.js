import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'moment/locale/zh-cn';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';

import '@/style/reset.less';
import '@/style/index.less';
import 'highlight.js/styles/atom-one-light.css'


hljs.registerLanguage('javascript', javascript);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
