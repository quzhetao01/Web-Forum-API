import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Post from './Post';
import SearchBar from './SearchBar';
import CategoryOption from './CategoryOption';
import tokenConfig from './helper';
import ForumCSS from '../styles/Forum.module.css';

export interface IPost {
    id: number,
    header: string,
    description: string,
    user_id: number,
    category_id: number,
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
    const [category, setCategory] = useState("All Posts");   
    
    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            window.location.href = "http://localhost:3001/";
        } else {
            getPosts();
            let config = tokenConfig();
            axios.get("http://localhost:3000/categories", config)
            .then(res => {
                // console.log(res.data);
                setCategories(res.data);
            })
            .catch(err => console.log(err));
        }}, [category]);

    // Allows users to add new thread
    function redirectAddPost() {
        window.location.href = "http://localhost:3001/addPosts"
    }

    function getPosts() {
        let config = tokenConfig();
        axios.get("http://localhost:3000/posts", config)
        .then(res => {
            // set userID state and postsArray state
            console.log(res.data);
            console.log("-----");
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

    return <div className="container-fluid py-4">
        <div className="row"> 
        {/* left column */}
            <div className="col-2 ms-5">
                <div className="card mb-5">
                    <div className="card-body">
                        <button onClick={redirectAddPost} className={`btn btn-dark ${ForumCSS.addPost}`}>ADD NEW THREAD</button>
                    </div>
                </div>
                <div className="card">
                    <h5 className="card-header" style={{backgroundColor: "#2E4052", 
                                                        color: "white", 
                                                        textAlign: "center"}}>Categories</h5>
                    <div className="card-body">
                        <ul className="list-group">
                        <CategoryOption key={0} id={"0"} name="All Posts" getPosts={getPosts} setPosts={setPosts} setCategory={setCategory}/>
                        {categories.map((category, index) => <CategoryOption 
                                                                key={category.id} 
                                                                id={category.id.toString()} 
                                                                name={category.name} 
                                                                getPosts={getPosts} 
                                                                setPosts={setPosts}
                                                                setCategory={setCategory}/>)}
                </ul>
                    </div>
                </div>
            </div>
            <div className="col-9">
                <div className="card mb-3">
                    <div className={`card-body d-flex justify-content-between`}>
                        <div className="ms-3" >
                            <h3 style={{fontWeight: "bold"}}>{category}</h3>
                        </div>
                        <div style={{width: "60%"}}>
                            <SearchBar setPosts={setPosts} setSearchParam={setSearchParam} setSearchExist={setSearchExist}/>

                        </div>
                        
                    </div>
                </div>
                {searchExist && <div className="card my-4">
                    <div className="d-flex justify-content-between card-body">
                        <span>Finding results for "<span style={{fontStyle: "italic"}}>{searchParam}</span>"</span>
                        <button onClick={returnAllPost} className='btn btn-secondary ms-auto'>Back to all posts</button>
                    </div>
                </div>}
                <div className="card mt-4">
                    <div>
                        <table className="text-center align-middle text-nowrap">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th className="fw-bold">Topic</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {posts.map((post: IPost, index) => <Post key={index} 
                                                            id={post.id} 
                                                            header={post.header} 
                                                            description={post.description} 
                                                            postUser={post.user_id}
                                                            categoryID={post.category_id} 
                                                            userID={userID}/>)}

                </div>
            </div>
        </div>
    </div>
}
    


    


export default Forum;