import React from 'react';
import ReactDOM from 'react-dom';

import constants from './constants';
import Experience from './experiences/Experience';

const words = require('../assets/RO2012.json');
console.log(words);

require('../styles/main.less');

const app = document.querySelector(constants.target.selector);

ReactDOM.render(
	<Experience constants={constants} words={words} api={constants.endpoint.url} />
, app);
