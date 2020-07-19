import React from 'react';

const Login = React.lazy(() => import('./pages/SamplePage/Login'));

const routes = [
	{ path: '/Login',exact:true,name:'Login',component:Login}
];

export default routes;