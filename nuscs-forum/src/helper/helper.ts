function tokenConfig() {
    const token = localStorage.getItem('jwt');
    return {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
}

export default tokenConfig;