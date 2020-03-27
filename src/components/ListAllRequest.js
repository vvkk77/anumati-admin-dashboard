import React from 'react';

import TableBoot from './TableBoot';
import api from '../api';
import sortBy from 'lodash.sortby';

class ListAllRequest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            orderList: [],
            error: null,
        };
    }

    componentDidMount = async () => {
        await this.fetchAllOrders();
    };

    fetchAllOrders = async () => {
        try {
            const response = await api.getAllOrders();

            if (response.status === 200) {
                this.setState({ orderList: sortBy(response.data.orders, 'createdAt').reverse() });
            } else {
            }
        } catch (error) {
            this.setState({ error: error.toString() });
        }
    };

    render() {
        if (this.state.error) {
            return (
                <div
                    style={{ height: '500px' }}
                    className='d-flex justify-content-center align-items-center'>
                    <h1 className='text-danger'>Unauthorised access</h1>
                </div>
            );
        }
        return (
            <div className='padding-46'>
                <TableBoot onRefresh={this.fetchAllOrders} rows={this.state.orderList} />
            </div>
        );
    }
}
export default ListAllRequest;
