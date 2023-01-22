import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Post from './Post';
import SearchBar from './SearchBar';
import CategoryOption from './CategoryOption';
import tokenConfig from './helper';
import ForumCSS from '../styles/Forum.module.css';

export interface IPost {
    id: Number,
    header: String,
    description: String,
    user_id: Number,
}

export interface ICategory {
    id: number,
    name: string
}

function Forum() {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [userID, setUserID] = useState();
    const [searchExist, setSearchExist] = useState(false);
    const [searchParam, setSearchParam] = useState("");
    const [categories, setCategories] = useState<ICategory[]>([]);   
    
    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            window.location.href = "http://localhost:3001/";
        } else {
            getPosts();
            let config = tokenConfig();
            axios.get("http://localhost:3000/categories", config)
            .then(res => {
                // console.log(res);
                setCategories(res.data);
            })
            .catch(err => console.log(err));
        }}, []);

    // Allows users to add new thread
    function redirectAddPost() {
        window.location.href = "http://localhost:3001/addPosts"
    }

    function getPosts() {
        let config = tokenConfig();
        axios.get("http://localhost:3000/posts", config)
        .then(res => {
            // set userID state and postsArray state
            setUserID(res.data.user.id);
            setPosts(res.data.posts);

        })
        .catch(err => {
            console.log(err);
            window.location.href = "http://localhost:3001/";
        })
    }
    
    function returnAllPost() {
        getPosts();
        setSearchExist(false);
        setSearchParam("");
    }

    return <div id={ForumCSS["forum"]} className="container">
        <h1>Forum Page</h1>
        <div className="row">
            <div className="col-4">
                <h4>Categories</h4>
                <ul className="list-group">
                    <CategoryOption key={0} id={"0"} name="All Posts" getPosts={getPosts} setPosts={setPosts}/>
                    {categories.map((category, index) => <CategoryOption 
                                                            key={category.id} 
                                                            id={category.id.toString()} 
                                                            name={category.name} 
                                                            getPosts={getPosts} 
                                                            setPosts={setPosts}/>)}
                </ul>
            </div>
            
            <div className="col-8">
                
                <SearchBar setPosts={setPosts} setSearchParam={setSearchParam} setSearchExist={setSearchExist}/>
                {searchExist && <div>
                    <span>Finding results for {searchParam}</span>
                    <button onClick={returnAllPost} className='btn btn-dark'>Back to all posts</button>
                </div>
                }
                <button onClick={redirectAddPost} className='btn btn-dark'>Add new thread</button>
                {posts.map((post: IPost, index) => <Post key={index} id={post.id} header={post.header} description={post.description} postUser={post.user_id} userID={userID}/>)}
            </div>
        </div>
        
        
    </div>
}

export default Forum;