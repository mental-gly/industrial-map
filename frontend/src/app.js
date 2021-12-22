import React from 'react'

import Nav from "./pages/nav";
import {HashRouter as Router,Route,Routes} from 'react-router-dom'
import Login from './pages/login';
import Register from './pages/register';
import Mdata from './pages/mdata';
import Fail from './pages/fail-login';
import Success from './pages/success-login';
import Chart from './pages/chart';

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <h1 className="center-align">
                <Router>
             
                    <Routes>
                        
                        <Route path='/'  element = {<Login/>}/>
                        <Route path='/login'  element = {<Login/>}/>
                        <Route path='/register'  element = {<Register/>}/>
                        <Route path='/imap' element = {<Nav/>}/>
                        <Route path='/mdata' element = {<Mdata/>}/>
                        <Route path='/fail-login'  element = {<Fail/>}/>
                        <Route path='/success-login'  element = {<Success/>}/>
                        <Route path='/chart'  element = {<Chart/>}/>
                    </Routes>
                    
                    
                </Router>
                    
                </h1>
            </div>
        );
    }
}

export default App;