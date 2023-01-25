import axios from 'axios';
import React, {useState} from 'react';
import { IPost } from './Forum';
import tokenConfig from '../helper/helper';

interface IProps {
    setPosts: React.Dispatch<React.SetStateAction<IPost[]>>,
    setSearchParam: React.Dispatch<React.SetStateAction<string>>,
    setSearchExist: React.Dispatch<React.SetStateAction<boolean>>,
    setCategory: React.Dispatch<React.SetStateAction<string>>
}


const SearchBar= (props: IProps): JSX.Element => {
    const [search, setSearch] = useState("");

    

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.currentTarget.value);
    }
    
    function handleSearch() {
        const config = tokenConfig();
        axios.get(`http://localhost:3000/posts/search/${search}`, config)
        .then(res => {
            // display only relevant posts
            props.setPosts(res.data);
            // search mode on
            props.setSearchParam(search);
            props.setSearchExist(true);
            props.setCategory("All posts");     
        })
        .catch(err => console.error(err));
        setSearch("");
    }

    return <div className="d-flex">
            <input onChange={handleChange} className="form-control me-1" value={search} 
            type="search" placeholder="Search"/>
            <button onClick={handleSearch} className="btn btn-primary">
            <i className="fa-solid fa-magnifying-glass"></i>
            </button>     
        </div>
}

export default SearchBar;