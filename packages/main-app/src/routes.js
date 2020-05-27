import React from 'react';
import {Route,BrowserRouter as Router,Switch,Link} from 'react-router-dom';
 const Home=React.lazy(() => import('app_home/AppContainer'));
const Introduction=React.lazy(() => import('app_introduction/AppContainer'));
const Contact=React.lazy(() => import('app_contact/AppContainer'));
//import Navigation from './navigation';
const Routes = () =>{
    return(
    <Router>
        <div> 
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/introduction">Introduction</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
              <React.Suspense fallback="loading">
                <Route path="/home"> <Home /></Route>
                <Route path="/introduction"> <Introduction /></Route>
                <Route path="/contact"> <Contact /></Route>
              </React.Suspense>
        </div>
        </Router>
    );
}

export default Routes;
