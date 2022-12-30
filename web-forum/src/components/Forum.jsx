import React, {useEffect} from 'react';
import axios from 'axios';

function Forum() {
    useEffect(() => {
        axios.get("http://localhost:3000/me")
            .then(res => console.log(res))
            .catch(err => console.error(err));
    })
    return <h1>Forum Page</h1>
}

export default Forum;