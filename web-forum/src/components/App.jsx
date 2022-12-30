import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Forum from './Forum';
import Login from './Login';
import Welcome from './Welcome';
import Register from './Register';

function App() {
    return <div>
        <Router>
            <Routes>
                <Route exact path="/" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forum" element={<Forum />} />
            </Routes>
        </Router>
    </div>
}

export default App;