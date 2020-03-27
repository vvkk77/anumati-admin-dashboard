import axios from 'axios';

const BASE_URL = 'https://epass.egovernments.org:8091';

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers['content-type'] = 'application/json';

const ADMIN_USER_TOKEN = 'riczfcdtjtvrzwupoauehxvoajtjpsqlvesicif';

export default {
    signIn(email, password) {
        return axios.post('/signin', { email, password });
    },

    register(name, email, password) {
        return axios.post('/createAccount', { name, email, password, key: 'test' });
    },

    getAllOrders() {
        return axios.post('/getAllOrders', {
            authToken: ADMIN_USER_TOKEN,
        });
    },

    approveOrder(orderID, orderAction) {
        return axios.post('/approveOrder', {
            orderID,
            orderAction,
            authToken: ADMIN_USER_TOKEN,
        });
    },

    processOrder(orderID) {
        return axios.post('/processOrder', {
            orderID,
            authToken: ADMIN_USER_TOKEN,
        });
    },
};
