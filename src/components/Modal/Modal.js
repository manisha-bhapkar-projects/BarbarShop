import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

function ModalComp({title,body,show,onCancelClick,onContinueClick}) {
    return (
        <div>
            <Modal show={show}>
                <Modal.Header closeButton={false}>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onContinueClick}>
                        Continue
                    </Button>
                    <Button variant="primary" onClick={onCancelClick}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

ModalComp.propTypes = {

}

export default ModalComp

