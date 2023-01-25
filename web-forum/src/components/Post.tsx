import React from "react";
import ForumCSS from '../styles/Forum.module.css';


export interface Props {
    id: number,
    userID: number | void,
    postUserID: number,
    postUser: {username: string},
    header: string,
    description: string,
    categoryID: number
    category: {name: string}
}

const Post = (props: Props): JSX.Element => {


    
    function handlePost(event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) {
        // redirect to a page displaying the entire thread with its comments
        const url = `http://localhost:3001/forum/${props.id}`; 
        window.location.href = url;
    }

    return <tr className={ForumCSS.post}>
        <td style={{color:"#99b2dd", fontWeight: "500"}} className="text-left align-left">
            <p>{props.postUser.username}</p>
        </td>
        <td style={{color: "#3b71ca", fontWeight: "bold"}} className="text-left align-left">  
            <p className={`fs-6 ${ForumCSS.postLink}`} onClick={handlePost}>
                {props.header.length > 100 ? props.header.slice(0, 100) + "..." : props.header}
            </p>
        </td>
        <td style={{color: "#b5b2c2"}} className="text-center align-middle">
            {props.category.name}
        </td>
        
    </tr>
}

export default Post;