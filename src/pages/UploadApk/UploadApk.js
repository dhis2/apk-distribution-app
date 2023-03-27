import { Modal, ModalContent } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { Form } from './Form'

export const NewVersion = ({ isOpen, handleClose }) => (
    <>
        {isOpen && (
            <Modal onClose={handleClose}>
                <ModalContent>
                    <Form />
                </ModalContent>
            </Modal>
        )}
    </>
)

NewVersion.propTypes = {
    handleClose: PropTypes.func,
    isOpen: PropTypes.bool,
}
