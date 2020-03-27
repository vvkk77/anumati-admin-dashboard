import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';

import '../Table.css';
import { formatDate } from '../utils';
import DeclineModal from './DeclineModal';
import downloadArrow from '../images/download-arrow.png';
import verticalDots from '../images/vertical-dots.svg';
import api from '../api';
import { Dropdown, Badge } from 'react-bootstrap';

const ActionButton = React.forwardRef(({ children, onClick }, ref) => (
    <img
        className='action-icon'
        height='20'
        src={verticalDots}
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    />
));

const TableBoot = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [declineOrderId, setDeclineOrderId] = useState(null);

    const openDeclineModal = (orderId) => {
        setDeclineOrderId(orderId);
        setModalShow(true);
    };

    const onDeclineSubmit = async (reason) => {
        setModalShow(false);
        await api.approveOrder(declineOrderId, 'DECLINE');
        props.onRefresh();
    };

    const onApprove = async (orderId) => {
        await api.approveOrder(orderId, 'ACCEPT');
        await api.processOrder(orderId);
        props.onRefresh();
    };

    const Orders = props.rows.map((item, index) => {
        let statusClass = 'status';

        if (item.orderStatus) {
            statusClass += ` ${item.orderStatus.toLowerCase()}`;
        }

        return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>
                    <Badge variant={item.orderType == 'person' ? 'primary' : 'dark'}>
                        {item.orderType.toUpperCase()}
                    </Badge>
                </td>
                <td className='center'>{item.requestCount}</td>
                <td>{formatDate(item.createdAt)}</td>
                <td className={statusClass}>{item.orderStatus}</td>
                <td>{item['pdfUrl'] ? <img src={downloadArrow} alt='Download' /> : null}</td>
                <td>
                    <Dropdown>
                        <Dropdown.Toggle as={ActionButton} id='dropdown-basic'></Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => onApprove(item.id)}>
                                Approve
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => openDeclineModal(item.id)}>
                                Decline
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
        );
    });

    return (
        <div className='request-table-container'>
            <Table bordered hover>
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Type</td>
                        <td className='center'>No of Passes</td>
                        <td>Raised on</td>
                        <td className=''>Status</td>
                        <td width='300'>Download</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>{Orders}</tbody>
            </Table>

            <DeclineModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                onSubmit={onDeclineSubmit}></DeclineModal>
        </div>
    );
};

export default TableBoot;
