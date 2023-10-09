import i18n from '@dhis2/d2-i18n'
import { Card, Divider, CircularLoader } from '@dhis2/ui'
import classnames from 'classnames'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import React, { useState, useEffect } from 'react'
import { useIsAuthorized } from '../../auth'
import { VersionList } from '../../components'
import { useDataStore, useLatestRelease } from '../../hooks'
import styles from './ApkList.module.css'
import { ResetValues } from './ResetValues/ResetValues'
import { AboutSection, HeaderContent } from './Sections'

export const ApkList = () => {
    const release = useLatestRelease()
    const { hasAuthority } = useIsAuthorized()
    const { loading, latestVersion, versions } = useDataStore()
    const [apkList, setList] = useState([])
    const [currentVersion, setVersion] = useState({})

    useEffect(() => {
        latestVersion && setVersion(latestVersion)
        versions && setList(versions)
    }, [latestVersion, versions])

    useEffect(() => {
        if (!isEmpty(apkList)) {
            !isEqual(latestVersion, apkList[0]) && setVersion(apkList[0])
        } else {
            release && setVersion(release)
        }
    }, [apkList])

    return (
        <Card className={styles.appCard}>
            {loading ? (
                <CircularLoader />
            ) : (
                <div className={styles.container}>
                    <HeaderContent text={i18n.t('Android Capture app')} />
                    <Divider />
                    <AboutSection
                        latest={currentVersion}
                        updateVersion={setVersion}
                        versions={apkList}
                        handleList={setList}
                        disabled={!hasAuthority}
                    />
                    {loading ? (
                        <CircularLoader />
                    ) : (
                        <>
                            {!isEmpty(apkList) && (
                                <>
                                    <Divider />
                                    <h2
                                        className={classnames(
                                            styles.appCardHeading,
                                            styles.appCardSection
                                        )}
                                    >
                                        {i18n.t(
                                            'All versions of the application'
                                        )}
                                    </h2>
                                    <VersionList
                                        versions={apkList}
                                        handleList={setList}
                                        disabled={!hasAuthority}
                                    />
                                </>
                            )}
                        </>
                    )}

                    <ResetValues disabled={!hasAuthority} />
                </div>
            )}
        </Card>
    )
}
