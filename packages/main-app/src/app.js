import React from 'react';
import {Route,BrowserRouter as Router} from 'react-router-dom';
//const Home=React.lazy(() => import('app_home/AppContainer'));
//const Introduction=React.lazy(() => import('app_introduction/AppContainer'));
import Routes from './routes';
//const App = () => <Routes />
//import Introduction from './introduction';
const App = () =>  <Routes/>
export default App;
/*<React.Suspense fallback="loading ..">
<Route path="/"> <Introduction />   </Route>
<Route path ="/introduction" component={Introduction} />
</React.Suspense>*/