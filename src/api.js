import axios from 'axios';

const BASE_URL = 'https://epass.egovernments.org:8091';

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers['content-type'] = 'application/json';
axios.interceptors.request.use(
    function(config) {
        window.dispatchEvent(new CustomEvent('showLoader'));

        return config;
    },
    function(error) {
        window.dispatchEvent(new CustomEvent('hideLoader'));
        return Promise.reject(error);
    },
);

axios.interceptors.response.use(
    function(response) {
        window.dispatchEvent(new CustomEvent('hideLoader'));
        return response;
    },
    function(error) {
        window.dispatchEvent(new CustomEvent('hideLoader'));
        return Promise.reject(error);
    },
);
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
