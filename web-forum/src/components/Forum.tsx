import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Post from './Post';
import SearchBar from './SearchBar';
import CategoryOption from './CategoryOption';
import tokenConfig from '../helper/helper';
import ForumCSS from '../styles/Forum.module.css';

export interface IPost {
    id: number,
    header: string,
    description: string,
    user_id: number,
    user: {username: string},
    category_id: number,
    category: {name: string}
}

export interface ICategory {
    id: number,
    name: string
}

const Forum = (): JSX.Element => {
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
            let config = tokenConfig();
            axios.get("http://localhost:3000/me", config)
            .then(res => {
                setUserID(res.data.id);
            })
            .catch(err => { //redirect to welcome page
                console.log(err);
                window.location.href = "http://localhost:3001/";
            })

            getPosts(); // load posts array
            axios.get("http://localhost:3000/categories", config)
            .then(res => {
                setCategories(res.data); // load categories array
            })
            .catch(err => console.log(err));
        }}, []);

    // Allows users to add new thread
    function redirectAddPost() {
        window.location.href = "http://localhost:3001/addPosts";
    }

    // get all posts
    function getPosts() {
        let config = tokenConfig();
        axios.get("http://localhost:3000/posts", config)
        .then(res => {
            setPosts(res.data);
        })
        .catch(err => {
            console.log(err);
            // window.location.href = "http://localhost:3001/";
        })
    }
    

    function returnAllPost() {
        getPosts(); // load all the posts
        // off Search mode
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
                        <CategoryOption key={0} id={"0"} name="All Posts" getPosts={getPosts} setPosts={setPosts} setCategory={setCategory} 
                                                                                                            setSearchExist={setSearchExist}/>
                        {categories.map((category, index) => <CategoryOption 
                                                                key={category.id} 
                                                                id={category.id.toString()} 
                                                                name={category.name} 
                                                                getPosts={getPosts} 
                                                                setPosts={setPosts}
                                                                setCategory={setCategory}
                                                                setSearchExist={setSearchExist}/>)}
                        </ul>
                    </div>
                </div>
            </div>
        {/* right column */}
            <div className="col-9">
                <div className="card mb-3">
                    <div className={`my-2 card-body d-flex justify-content-between`}>
                        <div className="ms-3 mt-1" >
                            <h3 style={{fontWeight: "bold"}}>{category}</h3>
                        </div>
                        <div className="" style={{width: "60%"}}>
                            <SearchBar setPosts={setPosts} setSearchParam={setSearchParam} 
                                        setSearchExist={setSearchExist} setCategory={setCategory}/>

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
                    <div className="mt-3 px-4">
                        <table className="table table-lg table-borderless text-left align-middle text-nowrap">
                            <thead style={{height: "40px"}}  >
                                <tr className="">
                                    <th className="fs-5 col-3 d-lg-table-cell">User posted</th>
                                    <th className="fs-5 col-5 d-lg-table-cell">Topic</th>
                                    <th className="fs-5 col-3 text-center d-lg-table-cell">Category</th>
                                </tr>
                            </thead>
                            <br />
                            <tbody className={ForumCSS.tableBody}>
                                {posts.map((post: IPost, index) => <Post key={index} 
                                                                        id={post.id} 
                                                                        header={post.header} 
                                                                        description={post.description} 
                                                                        postUserID={post.user_id}
                                                                        postUser={post.user}
                                                                        categoryID={post.category_id} 
                                                                        category={post.category}
                                                                        userID={userID}/>)}
                                
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </div>
}
    


    


export default Forum;