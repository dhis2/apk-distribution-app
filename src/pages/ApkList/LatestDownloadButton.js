import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { DownloadButton } from '../../components'
import styles from './ApkList.module.css'
import { getLatestDownloadApk } from './helper'

const query = {
    me: {
        resource: 'me',
    },
}

export const LatestDownloadButton = ({ apkList }) => {
    const { data, loading } = useDataQuery(query)
    const [latest, setLatest] = useState({})

    useEffect(() => {
        if (data?.me) {
            const { url, version } = getLatestDownloadApk(
                apkList,
                data.me.userGroups
            )
            setLatest({ url, version })
        }
    }, [data, apkList])

    return (
        <div>
            {!loading && (
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
