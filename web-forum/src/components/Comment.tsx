import React, {useState} from 'react';
import ThreadCSS from '../styles/Thread.module.css'
import tokenConfig from '../helper/helper';
import axios from 'axios';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';


export interface IComment {
    id: number,
    text: string,
    post_id: number,
    user_id: number,
    user: {username: string}
}

interface IProps {
    id: number,
    text: string,
    postID: number,
    commentUserID: number,
    commentUser: {username: string}
    currentUser: number | undefined,
    setComments: React.Dispatch<React.SetStateAction<IComment[]>>
}


const Comment = (props: IProps): JSX.Element => {

    const [isEditing, setEditing] = useState(false);
    const [editedComment, setEditedComment] = useState("");

    // Edit mode
    function handleEdit() {
        setEditing(true);
        setEditedComment(props.text);
    }

    // Cancel edit mode
    function cancelEdit() {
        setEditing(false);
        setEditedComment("");
    }
    
    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setEditedComment(event.currentTarget.value);
    }

    // Publish edited comment
    function submitEdit() {
        const commentData = {"comment": {
            "text": editedComment,
            "post_id": props.postID,
            "user_id": props.commentUser
        }};
        let config = tokenConfig();
        axios.patch(`http://localhost:3000/comments/${props.id}`, commentData, config)
        .then(res => {
            props.setComments(res.data);
        })
        .catch(err => console.log(err));
        setEditing(false);
        setEditedComment("");
    }

    // Delete comment
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
            <h5 style={{fontWeight: "bold", display: "inline"}}>{props.commentUser.username}</h5><p style={{display: "inline"}}> commented:</p>
        </div>
        <p style={{backgroundColor: "#ecf3f9"}} className={`border ${ThreadCSS.commentText}`}>{props.text}</p>

        {/* Edit and Delete feature available only to the user who commented */}
        {props.commentUserID === props.currentUser && <button onClick={handleEdit} className={`btn btn-dark ${ThreadCSS.editComment}`}><ModeEditOutlineOutlinedIcon/></button>}
        {props.commentUserID === props.currentUser && <button onClick={handleDelete} className={`btn btn-dark ${ThreadCSS.editComment}`}><DeleteOutlineOutlinedIcon/></button>}

        {/* Edit mode */}
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