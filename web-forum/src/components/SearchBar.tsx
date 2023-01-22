import axios from 'axios';
import React, {useState} from 'react';
import { IPost } from './Forum';
import tokenConfig from './helper';

interface IProps {
    setPosts: React.Dispatch<React.SetStateAction<IPost[]>>,
    setSearchParam: React.Dispatch<React.SetStateAction<string>>,
    setSearchExist: React.Dispatch<React.SetStateAction<boolean>>
}


function SearchBar(props: IProps) {
    const [search, setSearch] = useState("");
    

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.currentTarget.value);
    }
    
    function handleSearch() {
        const config = tokenConfig();
        axios.get(`http://localhost:3000/posts/search/${search}`, config)
        .then(res => {
            console.log(res);
            props.setPosts(res.data);
            props.setSearchParam(search);
            props.setSearchExist(true);     
        })
        .catch(err => console.error(err));
        setSearch("");
    }

    return <div className="w-50 d-flex">
            <input onChange={handleChange} className="form-control me-1" value={search} type="search" placeholder="Search" aria-label="Search"/>
            <button onClick={handleSearch} className="btn btn-primary">
            <i className="fa-solid fa-magnifying-glass"></i>
            </button>     
        </div>
}

export default SearchBar;