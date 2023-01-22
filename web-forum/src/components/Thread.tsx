import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import tokenConfig from './helper';
import axios from 'axios';
import ThreadCSS from '../styles/Thread.module.css'
import Comment, {IComment} from './Comment';




function Thread() {
    const [userID, setUserID] = useState();
    const [post, setPost] = useState({id: 0, header: "", description: "", user_id: 0});
    const [isExpanded, setExpanded] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState<IComment[]>([]);
    let { id } = useParams();
    let navigate = useNavigate();


    
    useEffect(() => {
        if (!localStorage.getItem('jwt')) { //redirect to welcome page
            window.location.href = "http://localhost:3001/";
        } else {
            let config = tokenConfig();
            axios.get("http://localhost:3000/me", config)
            .then(res => {
                console.log(res.data);
                setUserID(res.data.id);
            })
            .catch(err => { //redirect to welcome page
                console.log(err);
                window.location.href = "http://localhost:3001/";
            })


            // set post State to the specific post 
            axios.get(`http://localhost:3000/posts/${id}`, config)
            .then(res => {
                // console.log(res.data);
                setPost(res.data);
            })
            .catch(err => console.log(err));

            // set comments array to all comments related to the post
            axios.get(`http://localhost:3000/comments/${id}`, config)
            .then(res => {
                console.log(res.data);
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
        const commentData = {"comment": {
            "text": newComment,
            "post_id": id,
            "user_id": userID
        }}
        let config = tokenConfig();
        axios.post("http://localhost:3000/comments", commentData, config)
        .then(res => {
            console.log(res);
            setComments((prevValue: IComment[]) => {
                return [...prevValue, res.data]
            })
        })
        .catch(err => {
            console.log(err);
        })
        setNewComment("");

    }
    
    function handleEdit(event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) {
        navigate(`../../editPosts/${id}`, {state: post})
    }

    function handleDelete(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const config = tokenConfig();
        axios.delete(`http://localhost:3000/posts/${id}`, config)
        .then(res => console.log(res))
        .catch(err => console.log(err));
        window.location.href = "http://localhost:3001/forum"
    }

    return <div className={ThreadCSS.post}>
        <div>
            <h3>{post.header}</h3>
            <p>{post.description}</p>
            {userID === post.user_id && <button onClick={handleEdit} className="btn btn-dark">Edit post</button>}
            {userID === post.user_id && <button onClick={handleDelete} className="btn btn-dark">Delete post</button>}
        </div>
        <div>
        <textarea
            className={ThreadCSS.addComment}
            name="content"
            onClick={expand}
            onChange={handleChange}
            value={newComment}
            placeholder="Input a comment"
            rows={isExpanded ? 3 : 1}
        />
        <button onClick={submitComment} className="btn btn-dark">Add Comment</button>
        </div>
        {comments.map((comment: IComment, index) => <Comment 
            key={index} 
            id={comment.id} 
            text={comment.text} 
            postID={comment.post_id} 
            commentUser={comment.user_id}
            currentUser={userID}
            setComments={setComments} />)}
    </div>

    

}

export default Thread;