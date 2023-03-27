import { Card } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

export const Page = ({ children }) => (
    <>
        <Card>
            <div>{children}</div>
        </Card>
    </>
)

Page.propTypes = {
    children: PropTypes.element,
}
