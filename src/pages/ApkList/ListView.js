import i18n from '@dhis2/d2-i18n'
import { CircularLoader, NoticeBox } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './ApkList.module.css'

export const ListView = ({
    loading,
    hasAuthority,
    isInitialDefault,
    children,
}) => {
    if (loading) {
        return <CircularLoader />
    }

    if (!hasAuthority && !isInitialDefault) {
        return (
            <NoticeBox
                title={i18n.t('Download Restricted')}
                className={styles.notice}
            >
                {i18n.t(
                    'No version available. Please contact your administrator'
                )}
            </NoticeBox>
        )
    }

    if (!hasAuthority && isInitialDefault) {
        return null
    }

    return children
}

ListView.propTypes = {
    children: PropTypes.node,
    hasAuthority: PropTypes.bool,
    isInitialDefault: PropTypes.bool,
    loading: PropTypes.bool,
}
