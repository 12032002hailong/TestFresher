
import axios from './customize-axios';
import instance from './customize-axios';

const fetchAllUser = () => {
    return axios.get("/api/users?page=2");
}

export {
    fetchAllUser
}

