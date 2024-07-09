import Axios from "axios";

const axios = Axios.create({
    baseURL: 'https://admin.kitchenkirana.com/api',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});

export default axios