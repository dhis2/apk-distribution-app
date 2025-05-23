import i18n from '@dhis2/d2-i18n'
import { Box, Card, Tag } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { DownloadButton } from '../../../components'
import styles from './MobileList.module.css'

export const MobileList = ({ versions, disabled }) => (
    <>
        {versions.map(
            ({ version, androidOSVersion, downloadURL, isDefault }) => (
                <VersionCard
                    key={version}
                    isDefault={isDefault}
                    version={version}
                    androidOSVersion={androidOSVersion}
                    downloadURL={downloadURL}
                    disabled={disabled}
                />
            )
        )}
    </>
)

MobileList.propTypes = {
    disabled: PropTypes.bool,
    versions: PropTypes.array,
}

const VersionCard = ({
    isDefault,
    version,
    androidOSVersion,
    downloadURL,
    disabled,
}) => (
    <Card className={styles.cardContainer}>
        <Box className={styles.currentVersionContainer}>
            <p className={styles.versionLabel}>{version}</p>
            {isDefault && <Tag positive>{i18n.t('Default')}</Tag>}
        </Box>
        <Box className={styles.versionContainer}>
            <p className={styles.versionTitle}>
                {i18n.t('Android OS version')}
            </p>
            <div className={styles.currentVersionContainer}>
                <p className={styles.versionInfo}>
                    {i18n.t('{{min}} (Minimum)', { min: androidOSVersion.min })}
                </p>
                <p className={styles.versionInfo}>
                    {i18n.t('{{recommended}} (Recommended)', {
                        recommended: androidOSVersion.recommended,
                    })}
                </p>
            </div>
        </Box>
        {!disabled && <DownloadButton url={downloadURL} primary />}
    </Card>
)

VersionCard.propTypes = {
    androidOSVersion: PropTypes.object,
    disabled: PropTypes.bool,
    downloadURL: PropTypes.string,
    isDefault: PropTypes.bool,
    version: PropTypes.string,
}
