import React, { useState } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';

const DeclineModal = (props) => {
    const [reason, setReason] = useState('');

    return (
        <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
            <Modal.Body>
                <h4>Enter Reason</h4>
                <p>Let the applicant know why their request is being rejected</p>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Control
                        onChange={(e) => setReason(e.target.value)}
                        as='textarea'
                        className='decline-form-reason-field'
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div className='d-flex justify-content-end decline-modal-footer'>
                    <Button onClick={props.onHide} variant='outline-primary'>
                        Cancel
                    </Button>
                    <Button
                        disabled={reason.length === 0}
                        onClick={() => props.onSubmit(reason)}
                        variant='primary'>
                        Send Note
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default DeclineModal;
