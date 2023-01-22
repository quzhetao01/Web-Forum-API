import axios from "axios";
import React from "react";
import tokenConfig from "./helper";
import { IPost } from "./Forum";
import ForumCSS from '../styles/Forum.module.css';

interface IProps {
    name: string,
    id: string,
    getPosts: () => void,
    setPosts: React.Dispatch<React.SetStateAction<IPost[]>>,
    setCategory: React.Dispatch<React.SetStateAction<string>>
}

function CategoryOption(props: IProps) {
    
    function handleClick(event: React.FormEvent<HTMLLIElement>) {
        const id = event.currentTarget.id;
        const display = id === "0" ? props.name : "Category: " + props.name;
        props.setCategory(display);
        if (id === "0") {
            props.getPosts();
        } else {
            const config = tokenConfig();
            axios.get(`http://localhost:3000/posts/category/${id}`, config)
            .then(res => {
                console.log(res);
                props.setPosts(res.data);
            })
            .catch(err => console.log(err));
        }
    }

    return <li onClick={handleClick} id={props.id} className="list-group-item" style={{backgroundColor: "#2E5266", 
                                                                                        color: "white", 
                                                                                        fontWeight: "bold"}}>{props.name}
            </li>
}

export default CategoryOption;