import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Forum from './Forum';
import Login from './Login';
import Welcome from './Welcome';
import Register from './Register';
import AddPost from './AddPost';
import Navbar from './Navbar';
import Thread from './Thread';
import EditPost from './EditPost';
import OwnPosts from './OwnPosts';

const App = (): JSX.Element => {
    return <div>
        <Navbar />
        <Router>
            <Routes> 
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/addPosts" element={<AddPost />} />
                <Route path="/editPosts/:id" element={<EditPost />} />
                <Route path="/forum/:id" element={<Thread />} />
                <Route path="/forum/ownPosts" element={<OwnPosts />} />
            </Routes>
        </Router>
    </div>
}

export default App;