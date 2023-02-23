import axios from "axios";
import React from "react";
import tokenConfig from "../helper/helper";
import { IPost } from "./Forum";
import ForumCSS from '../styles/Forum.module.css';


interface IProps {
    name: string,
    id: string,
    getPosts: () => void,
    setPosts: React.Dispatch<React.SetStateAction<IPost[]>>,
    setCategory: React.Dispatch<React.SetStateAction<string>>,
    setSearchExist: React.Dispatch<React.SetStateAction<boolean>>
}

const CategoryOption = (props: IProps): JSX.Element => {
    
    function handleClick(event: React.FormEvent<HTMLLIElement>) {
        const id = event.currentTarget.id;
        // Changes the header on the forum page depending on the category chose
        const display = id === "0" ? props.name : "Category: " + props.name;
        props.setCategory(display);

        if (id === "0") { // Select all posts
            props.getPosts();
        } else { // Select posts based on category
            const config = tokenConfig();
            axios.get(`http://localhost:3000/posts/category/${id}`, config)
            .then(res => {
                console.log(res);
                props.setSearchExist(false);
                props.setPosts(res.data);
            })
            .catch(err => console.log(err));
        }
    }

    return <li onClick={handleClick} id={props.id} 
                className={`list-group-item ${ForumCSS.category}`} 
                style={{backgroundColor: "#2E5266", color: "white", fontWeight: "bold"}}>
                {props.name}
            </li>
}

export default CategoryOption;