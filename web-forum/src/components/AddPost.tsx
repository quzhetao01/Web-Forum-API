import React, {useState, useEffect} from 'react';
import axios from 'axios';
import RadioButton from './RadioButton';
import tokenConfig from './helper';
import AddPostCSS from '../styles/AddPost.module.css';
import { ICategory } from './Forum';



const AddPost = () => {
    const [text, setText] = useState({title: "", description:""});
    const [isError, setError] = useState({title: false, description: false, category: false}); //Determines if error message is displayed
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("0");

    useEffect(() => {
        if (!localStorage.getItem('jwt')) { //redirect to welcome page
            window.location.href = "http://localhost:3001/";
        } else {
            let config = tokenConfig();
            axios.get("http://localhost:3000/me", config)
            .then(res => {
                // console.log(res.data);
            })
            .catch(err => { //redirect to welcome page
                console.log(err);
                window.location.href = "http://localhost:3001/";
            })
            axios.get("http://localhost:3000/categories", config)
            .then(res => {
                console.log(res);
                setCategories(res.data);
            })
            .catch(err => console.log(err));
            
        }}, []);



    function handleText(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.currentTarget;
        setText(prevValue => {
            return {...prevValue, 
                [name]: value};
            })
    }

    function addThread() {
        const chosenCategory = parseInt(selectedCategory);
        if (text.title && text.description && chosenCategory) {
            const data = {"post": {"header": text.title, 
                                    "description": text.description, 
                                    "category_id": chosenCategory}};
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
        setError({title: false, description: false, category: false})
        if (chosenCategory === 0) {
            setError(prevValue => {
                return {...prevValue,
                    category: true};
            });
        }
        if (!text.title) {
            setError(prevValue => {
                return {...prevValue, 
                    title: true}
            })
        } 
        if (!text.description) {
            setError(prevValue => {
                return {...prevValue, 
                    description: true}
            });
        } 
        setText({title: "", description: ""});
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
        {/* <div> */}
        <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
            <h6>Choose an appropriate category for your thread</h6>
            
            {categories.map((category, index) => <RadioButton key={index} id={category.id.toString()} name={category.name} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>)}
        </div>
        {/* </div> */}
        {isError.title && <p className={AddPostCSS.error}>Title cannot be empty</p>}
        {isError.description && <p className={AddPostCSS.error}>Description cannot be empty</p>}
        {isError.category && <p className={AddPostCSS.error}>Please choose a relevant category</p> }
        <button className='btn btn-dark' onClick={addThread}>Publish thread</button>
    </div>
}

export default AddPost;