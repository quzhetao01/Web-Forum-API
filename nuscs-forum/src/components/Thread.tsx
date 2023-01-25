import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import tokenConfig from '../helper/helper';
import axios from 'axios';
import ThreadCSS from '../styles/Thread.module.css'
import Comment, {IComment} from './Comment';
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Delete from '@mui/icons-material/Delete';




function Thread() {
    const [userID, setUserID] = useState();
    const [post, setPost] = useState({id: 0, header: "", description: "", user_id: 0, user: {username:""}});
    const [isExpanded, setExpanded] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState<IComment[]>([]);
    const [isError, setError] = useState(false);
    let { id } = useParams();
    let navigate = useNavigate();


    
    useEffect(() => {
        if (!localStorage.getItem('jwt')) { //redirect to welcome page
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


            // load post State to the specific post 
            axios.get(`http://localhost:3000/posts/${id}`, config)
            .then(res => {
                console.log(res.data);
                setPost(res.data);
            })
            .catch(err => console.log(err));

            // load comments array to all comments related to the post
            axios.get(`http://localhost:3000/comments/${id}`, config)
            .then(res => {

                setComments(res.data);
            })
            .catch(err => console.log(err));
            
        }}, []);

    function expand(event: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) {
        setExpanded(true);
    }

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setNewComment(event.currentTarget.value);
    }
    
    function submitComment(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (newComment) {

            
            const commentData = {"comment": {
                "text": newComment,
                "post_id": id,
                "user_id": userID
            }}
            let config = tokenConfig();
            axios.post("http://localhost:3000/comments", commentData, config)
            .then(res => {
                setComments((prevValue: IComment[]) => {
                    return [...prevValue, res.data]
                })
            })
            .catch(err => {
                console.log(err);
            })
            setNewComment("");
        } else {
            setError(true);
        }

    }
    
    // redirect to edit thread
    function handleEdit(event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) {
        navigate(`../../editPosts/${id}`, {state: post})
    }

    // delete thread
    function handleDelete(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const config = tokenConfig();
        axios.delete(`http://localhost:3000/posts/${id}`, config)
        .then(res => console.log(res))
        .catch(err => console.log(err));
        window.location.href = "http://localhost:3001/forum";
    }

    return <div className="container-fluid p-5">
        <div className="row px-5">
            <div className="col px-5">
                <div className="card">
                    <div className="card-body">
                        <div className="border-bottom ms-2 pb-5">
                            <p style={{fontWeight: "bold"}} className="fs-6">Posted by: <span style={{color: "#b5b2c2"}}>{post.user.username}</span></p>
                            <div className="d-flex justify-content-between my-2">
                                <h3 style={{color: "#3b71ca", fontWeight:"bold"}}>{post.header}</h3>
                                <div>
                                    {userID === post.user_id && <button onClick={handleEdit} className={`btn btn-dark ${ThreadCSS.editPost}`}><ModeEditIcon/></button>}
                                    {userID === post.user_id && <button onClick={handleDelete} className={`btn btn-dark ${ThreadCSS.editPost}`}><Delete/></button>}
                                    
                                </div>
                            </div>
                            <p>{post.description}</p>
                            <div className={ThreadCSS.addSection}>

                                <textarea
                                    className={ThreadCSS.addComment}
                                    name="content"
                                    onClick={expand}
                                    onChange={handleChange}
                                    value={newComment}
                                    placeholder="Input a comment"
                                    rows={isExpanded ? 3 : 1}
                                    />
                                <button className={`${ThreadCSS.addButton}`} onClick={submitComment}><AddIcon/></button>
                            </div>
                            {isError && <p className={`text-danger`}>Cannot publish an empty comment</p>}
                        </div>
                        <div style={{backgroundColor: "#fcfbfc"}} className={`mt-5 card ${ThreadCSS.commentList}`}>
                            {comments.map((comment: IComment, index) => <Comment 
                                    key={index} 
                                    id={comment.id} 
                                    text={comment.text} 
                                    postID={comment.post_id} 
                                    commentUserID={comment.user_id}
                                    commentUser={comment.user}
                                    currentUser={userID}
                                    setComments={setComments} />)}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    // <div className={ThreadCSS.post}>
    //     <div>
    //         <h3>{post.header}</h3>
    //         <p>{post.description}</p>
    //         {userID === post.user_id && <button onClick={handleEdit} className="btn btn-dark">Edit post</button>}
    //         {userID === post.user_id && <button onClick={handleDelete} className="btn btn-dark">Delete post</button>}
    //     </div>
    //     <div>
    //     <textarea
    //         className={ThreadCSS.addComment}
    //         name="content"
    //         onClick={expand}
    //         onChange={handleChange}
    //         value={newComment}
    //         placeholder="Input a comment"
    //         rows={isExpanded ? 3 : 1}
    //     />
    //     <button onClick={submitComment} className="btn btn-dark">Add Comment</button>
    //     </div>
    //     {comments.map((comment: IComment, index) => <Comment 
    //         key={index} 
    //         id={comment.id} 
    //         text={comment.text} 
    //         postID={comment.post_id} 
    //         commentUser={comment.user_id}
    //         currentUser={userID}
    //         setComments={setComments} />)}
    // </div>

    

}

export default Thread;