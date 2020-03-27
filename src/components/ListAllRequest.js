import React from 'react';

import TableBoot from './TableBoot';
import api from '../api';

class ListAllRequest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            orderList: [],
        };
    }

    componentDidMount = async () => {
        await this.fetchAllOrders();
    };

    fetchAllOrders = async () => {
        try {
            const response = await api.getAllOrders();

            if (response.status === 200) {
                this.setState({ orderList: response.data.orders });
            } else {
                this.createStaticData();
            }
        } catch (error) {
            this.setState({ fetchError: error.toString() });
            this.createStaticData();
        }
    };

    //placeholder data
    createStaticData = () => {
        this.setState({
            orderList: [
                {
                    id: '',
                    accountId: '',
                    orderStatus: '',
                    orderType: '',
                    requestCount: '100',

                    district: 'Bengaluru',
                    type: 'VEHICLE',
                    status: 'Approved',
                    createdAt: '25/03/2020 | 07:01 am',
                    pdfUrl:
                        'https://www.who.int/docs/default-source/coronaviruse/situation-reports/20200308-sitrep-48-covid-19.pdf',
                },
                {
                    requestCount: '300',
                    district: 'Bengaluru',
                    type: 'PERSON',
                    status: 'Pending',
                    createdAt: '30/04/2020 | 10:01 pm',
                    pdfUrl: null,
                },
            ],
        });
    };

    render() {
        return (
            <div className='padding-46'>
                <TableBoot onRefresh={this.fetchAllOrders} rows={this.state.orderList} />
            </div>
        );
    }
}
export default ListAllRequest;
