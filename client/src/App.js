import React, { Component,Suspense } from 'react';
import {BrowserRouter , Switch , Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import{ ConfigureStore } from './state/store';
import routes from './routes'; 

const store = ConfigureStore();

class App extends Component { 

	loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

	render() {
    	return (

		    <Provider store={store}>
			    <Suspense fallback={this.loading()}>	
			    	<BrowserRouter>
			    		<Switch>
		          			{routes.map((route,index) => 
		          				<Route 
		          					key={index} 
		          					exact={route.exact} 
		          					path={route.path} 
		          					component = {route.component}
		          				/>
			        		)}
		        		</Switch>	
			      	</BrowserRouter>
			    </Suspense>  	
		    </Provider> 	
    	);
  	}
}

export default App;