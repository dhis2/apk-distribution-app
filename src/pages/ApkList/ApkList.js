import i18n from '@dhis2/d2-i18n'
import { Card, Divider, CircularLoader } from '@dhis2/ui'
import classnames from 'classnames'
import React from 'react'
import { VersionTable } from '../../components'
import styles from './ApkList.module.css'
import { AboutSection, HeaderContent } from './Sections'
import { useDataStore } from './useDataStore'

export const ApkList = () => {
    const { loading, versionsData } = useDataStore()

    return (
        <Card className={styles.appCard}>
            {loading ? (
                <CircularLoader />
            ) : (
                <div className={styles.container}>
                    <HeaderContent text={i18n.t('Android Capture app')} />
                    <Divider />
                    <AboutSection latest={versionsData.latest} />
                    <Divider />
                    <h2
                        className={classnames(
                            styles.appCardHeading,
                            styles.appCardSection
                        )}
                    >
                        {i18n.t('All versions of the application')}
                    </h2>
                    {loading ? (
                        <CircularLoader />
                    ) : (
                        <VersionTable versions={versionsData.versions} />
                    )}
                </div>
            )}
        </Card>
    )
}
