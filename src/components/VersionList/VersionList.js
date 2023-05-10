import PropTypes from 'prop-types'
import React from 'react'
import { useIsMobile } from '../../hooks'
import { MobileList } from './MobileList'
import { WebTable } from './WebTable'

export const VersionList = ({ versions, handleList, disabled }) => {
    const isMobile = useIsMobile()

    return (
        <>
            {isMobile ? (
                <MobileList versions={versions} disabled={disabled} />
            ) : (
                <WebTable
                    versions={versions}
                    handleList={handleList}
                    disabled={disabled}
                />
            )}
        </>
    )
}

VersionList.propTypes = {
    disabled: PropTypes.bool,
    handleList: PropTypes.func,
    versions: PropTypes.array,
}
