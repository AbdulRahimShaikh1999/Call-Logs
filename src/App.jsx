import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './Header.jsx';
import Main from './Main.jsx';

const App = () => {
  return (
	  <Router>
		<div className='container'>
			<Header/>
			<Main />
		</div>
	</Router>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
