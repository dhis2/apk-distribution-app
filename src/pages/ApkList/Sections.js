import i18n from '@dhis2/d2-i18n'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { DownloadButton, Icons } from '../../components'
import { UploadApkButton } from '../UploadApk'
import styles from './ApkList.module.css'

export const AboutSection = ({ latest }) => {
    return (
        <section
            className={classnames(styles.appCardSection, styles.aboutSection)}
        >
            <div>
                <h2 className={styles.appCardHeading}>
                    {i18n.t('Description')}
                </h2>
                <div className={styles.appCardParagraph}>
                    <p>
                        {i18n.t(
                            'New generation of DHIS2 Android Apps for data sets, events and tracker data capture. Configurable feel and look, easier login and enhanced data protection, attractive and user friendly navigation. Search/registration integrated for tracker, improved tracker dashboard, pictorial data entry for events, event completeness information, and many more.'
                        )}
                    </p>
                    <p>
                        {i18n.t(
                            'This app is fully functional offline enabling health workers in areas where there is limited or no Internet connection, continue with their regular work.'
                        )}
                    </p>
                </div>
            </div>

            <div>
                <Icons />
            </div>

            <div>
                <DownloadButton
                    url={latest.downloadURL}
                    primary
                    small={false}
                />
                <p className={styles.latestVersionDescription}>
                    {i18n.t('Latest version {{version}}', {
                        version: latest.version,
                    })}
                </p>
            </div>

            <UploadApkButton />
        </section>
    )
}

AboutSection.propTypes = {
    latest: PropTypes.object,
}

export const HeaderContent = ({ text }) => (
    <section className={classnames(styles.appCardSection)}>
        <div>
            <h2 className={styles.appCardName}>{text}</h2>
        </div>
    </section>
)

HeaderContent.propTypes = {
    text: PropTypes.string,
}
