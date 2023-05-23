import i18n from '@dhis2/d2-i18n'
import { Button } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

export const DeleteButton = ({ onClick, ...props }) => (
    <Button onClick={onClick} destructive {...props}>
        {i18n.t('Delete')}
    </Button>
)

DeleteButton.propTypes = {
    onClick: PropTypes.func,
}
