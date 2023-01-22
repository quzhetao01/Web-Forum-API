import React from "react";
import AddPostCSS from "../styles/AddPost.module.css"

interface IProps {
    id: string,
    name: string, 
    selectedCategory: string,
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
}

function RadioButton(props: IProps) {

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        props.setSelectedCategory(event.currentTarget.id);
    }

    return <span>
            <input type="radio" className={`${AddPostCSS.category} btn-check`} name={props.name} id={props.id} checked={props.selectedCategory === props.id} onChange={handleChange}/>
            <label className={`btn-outline-secondary btn`} htmlFor={props.id}>{props.name}</label>
        </span>
} 

export default RadioButton;