function tokenConfig() {
    const token = localStorage.getItem('jwt');
    return {
        headers: {
            'Authorization': 'Bearer ' + token
        },
        withCredentials: true 
    };
}

export default tokenConfig;