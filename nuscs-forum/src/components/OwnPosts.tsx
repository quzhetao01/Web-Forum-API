import React, {useState, useEffect} from "react";
import axios from "axios";
import tokenConfig from "../helper/helper";
import { IPost } from "./Forum";
import Post from "./Post";
import ForumCSS from '../styles/Forum.module.css';



const OwnPosts = (): JSX.Element => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [userID, setUserID] = useState(0);
  
    
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
        }}, []);


    useEffect(() => {
        // only send get request if userID is updated, prevents multiple requests due to useEffect
        if (userID !== 0) {
            getPosts();
        }
    }, [userID])


    function getPosts() {
        let config = tokenConfig();
        axios.get(`http://localhost:3000/posts/ownUser/${userID}`, config)
        .then(res => {
            console.log(res.data);
            setPosts(res.data);

        })
        .catch(err => {
            console.log(err);
            window.location.href = "http://localhost:3001/"; //redirect to welcome page
        })
    }
    
    function returnAllPost() {
        // redirect back to main forum page
        window.location.href = "http://localhost:3001/forum";
    }

    return <div className="container-fluid py-4">
        <div className="row d-flex justify-content-center"> 
    
            <div className="col-9">
                <div className="card mb-3">
                    <div className={`my-2 card-body d-flex justify-content-between`}>
                        <div className="ms-3 mt-1" >
                            <h3 style={{fontWeight: "bold"}}>Your threads</h3>
                        </div>
                        <button onClick={returnAllPost} className='btn btn-secondary ms-auto'>Back to all threads</button>
                    </div>
                </div>
                <div className="card mt-4">
                    <div className="mt-3 px-4">
                        <table className="table table-lg table-borderless text-left align-middle text-nowrap">
                            <thead style={{height: "40px"}}  >
                                <tr className="">
                                    <th className="fs-5 col-3 d-lg-table-cell">You posted</th>
                                    <th className="fs-5 col-5 d-lg-table-cell">Topic</th>
                                    <th className="fs-5 col-3 text-center d-lg-table-cell">Category</th>
                                </tr>
                            </thead>
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


export default OwnPosts;