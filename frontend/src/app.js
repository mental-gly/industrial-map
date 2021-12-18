import React from 'react'
import ReactDOM from 'react-dom'
import Nav from "./pages/nav";
import {HashRouter as Router,Route,Routes,Link} from 'react-router-dom'
import Login from './pages/login';
import Register from './pages/register';

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


                    </Routes>
                    
                    
                </Router>
                    
                </h1>
            </div>
        );
    }
}

export default App;