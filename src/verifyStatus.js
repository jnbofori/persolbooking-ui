import jwt_decode from "jwt-decode";

export const checkUserStatus = () => {
    let currentUser = null;
    if(localStorage.token) {
        const token = localStorage.getItem('token');
        let decoded = jwt_decode(token);
        if(decoded.admin) {
            currentUser = 'admin'
        }else{
            currentUser = 'user'
        }
    }else{
        currentUser = 'none'
    }
    return currentUser;
};