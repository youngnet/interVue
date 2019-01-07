import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import "babel-polyfill";
ReactDOM.render(
	<LocaleProvider locale={zhCN}><App /></LocaleProvider>
	, document.getElementById('app')
);
