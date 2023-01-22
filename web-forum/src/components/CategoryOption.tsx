import axios from "axios";
import React from "react";
import tokenConfig from "./helper";
import { IPost } from "./Forum";

interface IProps {
    name: string,
    id: string,
    getPosts: () => void,
    setPosts: React.Dispatch<React.SetStateAction<IPost[]>>
}

function CategoryOption(props: IProps) {
    
    function handleClick(event: React.FormEvent<HTMLLIElement>) {
        const id = event.currentTarget.id;
        console.log(id);
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

    return <li onClick={handleClick} id={props.id} className="list-group-item">{props.name}</li>
}

export default CategoryOption;