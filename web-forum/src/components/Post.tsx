import React, {useState, useEffect} from "react";
import PostCSS from "../styles/Post.module.css";
import axios from "axios";
import tokenConfig from "./helper";

export interface Props {
    id: number,
    userID: number | void,
    postUser: number,
    header: string,
    description: string,
    categoryID: number
}

const Post = (props: Props): JSX.Element => {
    const [username, setUsername] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        let config = tokenConfig();
        axios.get(`http://localhost:3000/users/${props.postUser}`, config)
            .then(res => {
                console.log(res.data);
                setUsername(res.data.username);
            })
            .catch(err => { //redirect to welcome page
                console.log(err);
                window.location.href = "http://localhost:3001/";
            })

        axios.get(`http://localhost:3000/categories/${props.categoryID}`, config)
        .then(res => {
            console.log(res.data);
            setCategory(res.data.name);
        })
        .catch(err => { //redirect to welcome page
            console.log(err);
            window.location.href = "http://localhost:3001/";
        })
    }, [])
    function handlePost(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const url = `http://localhost:3001/forum/${props.id}`; 
        window.location.href = url;
    }

    return <tr className="border-bottom">
        <td>
            <h4>{username}</h4>
        </td>
        <td>
            <div className={PostCSS.post}>
                <h3>{props.header}</h3>
                
                <button onClick={handlePost}className="btn btn-dark">See more of this thread</button>
            </div>
        </td>
        <td>
            Category {category}
        </td>
        
    </tr>
}

export default Post;