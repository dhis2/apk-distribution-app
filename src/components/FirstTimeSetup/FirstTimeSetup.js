import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import {
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    ButtonStrip,
    Button,
} from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './FirstTimeSetup.module.css'

export const FirstTimeSetup = ({ handleSave, disable }) => {
    const { baseUrl } = useConfig()

    return (
        <>
            <Modal position="middle">
                <ModalTitle>{i18n.t('First time setup')}</ModalTitle>
                <ModalContent>
                    <p>
                        {i18n.t(
                            'Using the APK distribution app will apply default configuration to all Android devices connected to this instance.'
                        )}
                    </p>

                    <p
                        className={cx({
                            [styles.warning_color]: disable,
                        })}
                    >
                        {disable
                            ? i18n.t(
                                  "You don't have access to this app. Contact your DHIS2 system administrator to fix this problem."
                              )
                            : i18n.t(
                                  'To set up the default configuration and apply to all devices, click "Set default and save"'
                              )}
                    </p>
                </ModalContent>
                <ModalActions>
                    <ButtonStrip end>
                        <Button>
                            <a
                                href={baseUrl}
                                className={styles.button_redirect}
                            >
                                {i18n.t('Exit, do not apply settings')}
                            </a>
                        </Button>
                        <Button primary onClick={handleSave} disabled={disable}>
                            {i18n.t('Set defaults and save')}
                        </Button>
                    </ButtonStrip>
                </ModalActions>
            </Modal>
        </>
    )
}

FirstTimeSetup.propTypes = {
    disable: PropTypes.bool,
    handleSave: PropTypes.func,
}
