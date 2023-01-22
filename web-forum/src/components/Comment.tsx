import React, {useState, useEffect} from 'react';
import ThreadCSS from '../styles/Thread.module.css'
import tokenConfig from './helper';
import axios from 'axios';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';


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
    const [username, setUsername] = useState("");

    useEffect(() => {
        let config = tokenConfig();
        axios.get(`http://localhost:3000/users/${props.commentUser}`, config)
            .then(res => {
                console.log(props.commentUser);
                console.log(res.data);
                setUsername(res.data.username);
            })
            .catch(err => { //redirect to welcome page
                console.log(err);
                window.location.href = "http://localhost:3001/";
            })
    }, [])


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

    return <div id={props.id.toString()} className={`container card-body border-bottom ${ThreadCSS.comment}`}>
        <div className="mb-3">
            <h5 style={{fontWeight: "bold", display: "inline"}}>{username}</h5><p style={{display: "inline"}}> commented:</p>
        </div>
        <p style={{backgroundColor: "#ecf3f9"}} className={`border ${ThreadCSS.commentText}`}>{props.text}</p>
        {props.commentUser === props.currentUser && <button onClick={handleEdit} className={`btn btn-dark ${ThreadCSS.editComment}`}><ModeEditOutlineOutlinedIcon/></button>}
        {props.commentUser === props.currentUser && <button onClick={handleDelete} className={`btn btn-dark ${ThreadCSS.editComment}`}><DeleteOutlineOutlinedIcon/></button>}
        {isEditing && <div> 
            <div className={ThreadCSS.addSection}>
            <textarea
                className={ThreadCSS.addComment}
                name="content"
                onChange={handleChange}
                value={editedComment}
                placeholder="Edit your comment"
                rows={1}
            />       
        </div>
            <button onClick={cancelEdit} className={`btn btn-dark ${ThreadCSS.cancelEdit}`}>Cancel edit</button>
            <button onClick={submitEdit} className={`btn btn-dark ${ThreadCSS.cancelEdit}`}>Publish changes</button>
        </div>}

    </div>
}

export default Comment;