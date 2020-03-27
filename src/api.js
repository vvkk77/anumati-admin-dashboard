import axios from 'axios';

const BASE_URL = 'https://epass.egovernments.org:8091';

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers['content-type'] = 'application/json';

export default {
    signIn(email, password) {
        return axios.post('/signin', { email, password });
    },

    register(name, email, password) {
        return axios.post('/createAccount', { name, email, password, key: 'test' });
    },

    getAllOrders() {
        return axios.post('/getAllOrders', {
            authToken: localStorage.getItem('auth'),
        });
    },

    approveOrder(orderID, orderAction) {
        return axios.post('/approveOrder', {
            orderID,
            orderAction,
            authToken: localStorage.getItem('auth'),
        });
    },

    processOrder(orderID) {
        return axios.post('/processOrder', {
            orderID,
            authToken: localStorage.getItem('auth'),
        });
    },
};
