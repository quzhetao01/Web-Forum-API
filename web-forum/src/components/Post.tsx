import React, {useState} from "react";
import PostCSS from "../styles/Post.module.css";

export interface Props {
    id: Number,
    userID: Number | void,
    postUser: Number,
    header: String,
    description: String
}

const Post = (props: Props): JSX.Element => {

    function handlePost(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const url = `http://localhost:3001/forum/${props.id}`; 
        window.location.href = url;
    }

    return <div>
        <div className={PostCSS.post}>
            <h3>{props.header}</h3>
            <p>{props.description}</p>
            <button onClick={handlePost}className="btn btn-dark">See more of this thread</button>
            {props.userID === props.postUser && <button className="btn btn-dark">Delete post</button>}
        </div>
    </div>
}

export default Post;