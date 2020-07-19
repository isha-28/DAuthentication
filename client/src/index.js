import React,{Fragment} from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import './app.css';
import Login from './pages/SamplePage/Login';
ReactDOM.render(

 <div id='root'>
	<Fragment>
	{/* <div className="topnav">
		<a href='http://localhost:3000/Login'>Login</a>
	</div> */}
	{/* <Login></Login> */}
	<App />
	</Fragment>
</div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
