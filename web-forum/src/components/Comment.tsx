import React, {useState} from 'react';
import CommentCSS from '../styles/Comment.module.css';
import tokenConfig from './helper';
import axios from 'axios';

export interface IComment {
    id: number,
    text: string,
    post_id: number,
    user_id: number
}

interface IProps {
    id: number,
    text: string,
    postID: number,
    commentUser: number,
    currentUser: number | undefined,
    setComments: React.Dispatch<React.SetStateAction<IComment[]>>
}


function Comment(props: IProps) {

    const [isEditing, setEditing] = useState(false);
    const [editedComment, setEditedComment] = useState("");


    function handleEdit() {
        setEditing(true);
        setEditedComment(props.text);
    }

    function cancelEdit() {
        setEditing(false);
        setEditedComment("");
    }
    
    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setEditedComment(event.currentTarget.value);
    }

    function submitEdit() {
        const commentData = {"comment": {
            "text": editedComment,
            "post_id": props.postID,
            "user_id": props.commentUser
        }}
        let config = tokenConfig();
        axios.patch(`http://localhost:3000/comments/${props.id}`, commentData, config)
        .then(res => {
            console.log(res);
            props.setComments(res.data)
        })
        .catch(err => console.log(err));
        setEditing(false);
        setEditedComment("");
    }

    function handleDelete() {
        let config = tokenConfig();
        axios.delete(`http://localhost:3000/comments/${props.id}`, config)
        .then(res => {
            console.log(res);
            props.setComments(prevValue => prevValue.filter(comment => comment.id !== props.id));
        })
        .catch(err => console.log(err));
    }

    return <div id={props.id.toString()} className={`container ${CommentCSS.comment}`}>
        <p>{props.text}</p>
        {props.commentUser === props.currentUser && <button onClick={handleEdit} className="btn btn-primary">Edit comment</button>}
        {props.commentUser === props.currentUser && <button onClick={handleDelete} className="btn btn-dark">Delete comment</button>}
        {isEditing && <div>
            <textarea
                // className={ThreadCSS.addComment}
                name="content"
                onChange={handleChange}
                value={editedComment}
                placeholder="Edit your comment"
                rows={1}
            />       
            <button onClick={cancelEdit} className="btn btn-primary">Cancel edit</button>
            <button onClick={submitEdit} className="btn btn-primary">Publish changes</button>

        </div>}
    </div>
}

export default Comment;