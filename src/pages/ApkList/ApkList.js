import i18n from '@dhis2/d2-i18n'
import { Card, Divider, CircularLoader } from '@dhis2/ui'
import classnames from 'classnames'
import isEmpty from 'lodash/isEmpty'
import React, { useState, useEffect } from 'react'
import { VersionTable } from '../../components'
import { useDataStore } from '../../hooks'
import styles from './ApkList.module.css'
import { AboutSection, HeaderContent } from './Sections'

export const ApkList = () => {
    const { loading, latestVersion, versions } = useDataStore()
    const [apkList, setList] = useState([])
    const [currentVersion, setVersion] = useState({})

    useEffect(() => {
        latestVersion && setVersion(latestVersion)
        versions && setList(versions)
    }, [latestVersion, versions])

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
                                    <VersionTable versions={apkList} />
                                </>
                            )}
                        </>
                    )}
                </div>
            )}
        </Card>
    )
}
