import React from 'react';
import ReactDOM from 'react-dom';

import constants from './constants';
import Experience from './experiences/Experience';

const dictionary = require('../assets/RO2012.json');

require('../styles/main.less');

const app = document.querySelector(constants.target.selector);

ReactDOM.render(
	<Experience constants={constants} dictionary={dictionary.words} api={constants.endpoint.url} />
, app);
