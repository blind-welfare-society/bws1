import Axios from "axios";

const axios = Axios.create({
    baseURL: 'https://dheeraj84.blindwelfaresociety.in/api',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});

export default axios