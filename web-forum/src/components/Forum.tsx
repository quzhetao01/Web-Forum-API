import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Post from './Post';
import tokenConfig from './helper';
import ForumCSS from '../styles/Forum.module.css';

interface IPost {
    id: Number,
    header: String,
    description: String,
    user_id: Number,
}

function Forum() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const [userID, setUserID] = useState();
    let token: String | null = null;
    
    
    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            console.log('redirected');
            window.location.href = "http://localhost:3001/";
        } else {
            let config = tokenConfig();
            axios.get("http://localhost:3000/posts", config)
            .then(res => {
                console.log(res.data);
                console.log(res.data.posts[0].user_id);
                setUserID(res.data.user.id);
                setPosts(res.data.posts);
                console.log(userID);
            })
            .catch(err => {
                console.log(err);
                window.location.href = "http://localhost:3001/";
            })
            
        }}, []);

    function redirectAddPost() {
        navigate('/addPosts', {state: {user_id: userID, token: token}});
    }
    
    return <div id={ForumCSS["forum"]}>
        <h1>Forum Page</h1>
        <button onClick={redirectAddPost} className='btn btn-dark'>Add new thread</button>
        {posts.map((post: IPost, index) => <Post key={index} id={post.id} header={post.header} description={post.description} postUser={post.user_id} userID={userID}/>)}
    </div>
}

export default Forum;