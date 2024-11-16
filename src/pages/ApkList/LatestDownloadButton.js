import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../app-context'
import { DownloadButton } from '../../components'
import styles from './ApkList.module.css'
import { getLatestDownloadApk } from './helper'

export const LatestDownloadButton = ({ apkList }) => {
    const { userGroups } = useAppContext()
    const [latest, setLatest] = useState({})
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        if (userGroups) {
            const { url, version, isInitialDefault } = getLatestDownloadApk(
                apkList,
                userGroups
            )
            setLatest({ url, version })
            setShowButton(isInitialDefault)
        }
    }, [userGroups, apkList])

    return (
        <div>
            {showButton && (
                <>
                    <DownloadButton url={latest.url} primary small={false} />

                    <p className={styles.latestVersionDescription}>
                        {i18n.t('Latest version {{version}}', {
                            version: latest.version,
                        })}
                    </p>
                </>
            )}
        </div>
    )
}

LatestDownloadButton.propTypes = {
    apkList: PropTypes.array,
}
