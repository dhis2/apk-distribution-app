import { useAlert } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import {
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    ButtonStrip,
    Button,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useLatestRelease, useUpdateVersions, useUserGroups } from '../../hooks'
import { prepareAPKListTable } from '../../pages/ApkList/helper'
import { DeleteButton } from '../Button'
import { deleteElementList } from './helper'

export const DeleteVersion = ({ version, versionList, handleList }) => {
    const release = useLatestRelease()
    const { userGroups } = useUserGroups()
    const { mutateVersion, mutateList } = useUpdateVersions()
    const [openModal, setOpen] = useState(false)
    const { show } = useAlert(
        ({ version, success }) =>
            success
                ? i18n.t(
                      'The version {{version}} has been successfully deleted.',
                      { version: version }
                  )
                : i18n.t('Error occurred while deleting version {{version}}.', {
                      version: version,
                  }),
        ({ success }) => (success ? { success: true } : { critical: true })
    )

    const handleButton = () => setOpen(true)

    const handleDelete = () => {
        const filteredList = deleteElementList(version, versionList)

        const updatePromises = [
            mutateVersion({
                version: {
                    downloadURL:
                        filteredList[0]?.downloadURL || release.downloadURL,
                    version: filteredList[0]?.version || release.version,
                },
            }),
            mutateList({ versionList: filteredList }),
        ]

        Promise.all(updatePromises)
            .then(() => {
                handleList(prepareAPKListTable(filteredList, userGroups))
                handleClose()
                show({ version: version, success: true })
            })
            .catch(() => {
                show({ version: version, success: false })
            })
    }

    const handleClose = () => setOpen(false)

    return (
        <>
            <DeleteButton onClick={handleButton} small />
            {openModal && (
                <DeleteModal
                    version={version}
                    onHandleClose={handleClose}
                    onHandleDelete={handleDelete}
                />
            )}
        </>
    )
}

DeleteVersion.propTypes = {
    handleList: PropTypes.func,
    version: PropTypes.string,
    versionList: PropTypes.array,
}

const DeleteModal = ({ version, onHandleClose, onHandleDelete }) => (
    <>
        <Modal position="middle" onClose={onHandleClose} small>
            <ModalTitle>{i18n.t('Delete app version')}</ModalTitle>
            <ModalContent>
                <p>{i18n.t('Deleting an app version cannot be undone.')}</p>
                <p>
                    {i18n.t(
                        'Are you sure you want to delete app version {{version}}?',
                        { version: version }
                    )}
                </p>
            </ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button onClick={onHandleClose}>{i18n.t('Cancel')}</Button>
                    <Button onClick={onHandleDelete} destructive>
                        {i18n.t('Delete')}
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    </>
)

DeleteModal.propTypes = {
    version: PropTypes.string,
    onHandleClose: PropTypes.func,
    onHandleDelete: PropTypes.func,
}
