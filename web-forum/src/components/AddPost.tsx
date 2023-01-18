import React, {useState, useEffect} from 'react';
import axios from 'axios';
import tokenConfig from './helper';
import AddPostCSS from '../styles/AddPost.module.css';


const AddPost = () => {
    const [text, setText] = useState({title: "", description:""});
    const [isError, setError] = useState({title: false, description: false}); //Determines if error message is displayed

    useEffect(() => {
        if (!localStorage.getItem('jwt')) { //redirect to welcome page
            window.location.href = "http://localhost:3001/";
        } else {
            let config = tokenConfig();
            axios.get("http://localhost:3000/me", config)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => { //redirect to welcome page
                console.log(err);
                window.location.href = "http://localhost:3001/";
            })
            
        }}, []);



    function handleText(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.currentTarget;
        setText(prevValue => {
            return {...prevValue, 
                [name]: value};
            })
    }

    function addThread() {
        if (!text.title && !text.title) {
            setText({title: "", description: ""});
            setError({title: true, description: true});
        } else if (!text.title) {
            setText({title: "", description: ""});
            setError({title: true, description: false});
        } else if (!text.description) {
            setText({title: "", description: ""});
            setError({title: false, description: true});
        } else {
            
            const data = {"post": {"header": text.title, "description": text.description}};
            let config = tokenConfig();
            axios.post("http://localhost:3000/posts", data, config)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
            setText({title: "", description: ""});
            window.location.href = "http://localhost:3001/forum";
        }
    }


    return <div className='container'>
        <h1>AddPosts Page</h1>
        <div className="mb-3">
            <label htmlFor="header" className="form-label">Title</label>
            <input onChange={handleText} name="title" className="form-control" id="header" placeholder="Title" value={text.title}/>
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea onChange={handleText} name="description" className="form-control" id="description" rows={7} placeholder="Text" value={text.description}></textarea>
        </div>
        {isError.title && <p className={AddPostCSS.error}>Title cannot be empty</p>}
        {isError.description && <p className={AddPostCSS.error}>Description cannot be empty</p>}
        <button className='btn btn-dark' onClick={addThread}>Publish thread</button>
    </div>
}

export default AddPost;