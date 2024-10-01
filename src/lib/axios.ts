import Axios from "axios";

const axios = Axios.create({
    baseURL: 'http://localhost/bws-admin/api',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});

export default axios