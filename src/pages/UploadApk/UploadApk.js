import { useAlert } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import {
    Modal,
    ModalContent,
    ReactFinalForm,
    InputFieldFF,
    SingleSelectFieldFF,
    hasValue,
    composeValidators,
    createPattern,
    Button,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { useUpdateVersions } from '../../hooks'
import { androidOSVersion } from '../../shared'
import { urlRegex, versionRegex } from '../../utils'
import styles from './Form.module.css'

const versionValidationMessage = i18n.t('Please provide a valid version')
const urlValidationMessage = i18n.t('Please provide a valid URL')

export const UploadApk = ({ isOpen, handleClose, versionList }) => {
    const { mutateVersion, mutateList } = useUpdateVersions()
    const { show } = useAlert(
        ({ version, success }) =>
            success
                ? `The version ${version} has been successfully uploaded.`
                : `Error occurred while uploading version ${version}.`,
        ({ success }) => (success ? { success: true } : { critical: true })
    )

    const handleSubmit = async (e) => {
        const updatePromises = [
            mutateVersion({
                version: {
                    downloadURL: e.downloadURL,
                    version: e.version,
                },
            }),
            mutateList({ versionList: [e, ...versionList] }),
        ]

        Promise.all(updatePromises)
            .then(() => {
                handleClose(e)
                show({ version: e.version, success: true })
            })
            .catch(() => show({ version: e.version, success: false }))
    }

    return (
        <>
            {isOpen && (
                <Modal onClose={handleClose}>
                    <ModalContent>
                        <>
                            <h2 className={styles.header}>
                                {i18n.t('Create app version')}
                            </h2>

                            <ReactFinalForm.Form onSubmit={handleSubmit}>
                                {({ handleSubmit, valid, submitting }) => (
                                    <form onSubmit={handleSubmit}>
                                        <ReactFinalForm.Field
                                            required
                                            name="version"
                                            label={i18n.t('Version')}
                                            placeholder={i18n.t('e.g. 1.0.0')}
                                            component={InputFieldFF}
                                            className={styles.field}
                                            validate={composeValidators(
                                                hasValue,
                                                createPattern(
                                                    versionRegex,
                                                    versionValidationMessage
                                                )
                                            )}
                                        />
                                        <ReactFinalForm.Field
                                            required
                                            filterable
                                            name="androidOSVersion.min"
                                            label={i18n.t(
                                                'Minimum Android version'
                                            )}
                                            placeholder={i18n.t(
                                                'Select a version'
                                            )}
                                            component={SingleSelectFieldFF}
                                            className={styles.field}
                                            validate={hasValue}
                                            options={androidOSVersion}
                                        />
                                        <ReactFinalForm.Field
                                            filterable
                                            name="androidOSVersion.recommended"
                                            label={i18n.t(
                                                'Recommended Android version'
                                            )}
                                            placeholder={i18n.t(
                                                'Select a version'
                                            )}
                                            component={SingleSelectFieldFF}
                                            className={styles.field}
                                            options={androidOSVersion}
                                        />
                                        <ReactFinalForm.Field
                                            required
                                            name="downloadURL"
                                            type="url"
                                            label={i18n.t('Download URL')}
                                            placeholder={i18n.t(
                                                'e.g. https://dhis2.org/demo',
                                                {
                                                    nsSeparator: '---',
                                                }
                                            )}
                                            helpText={i18n.t(
                                                'Add URL where the APK is saved'
                                            )}
                                            component={InputFieldFF}
                                            className={styles.field}
                                            validate={composeValidators(
                                                hasValue,
                                                createPattern(
                                                    urlRegex,
                                                    urlValidationMessage
                                                )
                                            )}
                                        />
                                        <Button
                                            primary
                                            type="submit"
                                            disabled={!valid || submitting}
                                        >
                                            {i18n.t('Create app version')}
                                        </Button>
                                    </form>
                                )}
                            </ReactFinalForm.Form>
                        </>
                    </ModalContent>
                </Modal>
            )}
        </>
    )
}

UploadApk.propTypes = {
    handleClose: PropTypes.func,
    isOpen: PropTypes.bool,
    versionList: PropTypes.array,
}
