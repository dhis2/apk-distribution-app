import { useAlert } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import {
    Button,
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    ButtonStrip,
} from '@dhis2/ui'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useUpdateVersions, useUserGroups } from '../../hooks'
import { prepareAPKListTable } from '../../pages/ApkList/helper'
import { UserGroupAccess } from '../UserGroupAccess'
import { getGroup, updateList } from './helper'

export const AssignUserGroup = ({ version, versionList, handleList }) => {
    const { userGroups } = useUserGroups()
    const { mutateList } = useUpdateVersions()
    const [openModal, setOpen] = useState(false)
    const [groups, setGroups] = useState([])
    const { show } = useAlert(
        ({ version, success }) =>
            success
                ? i18n.t(
                      'The version {{version}} has been successfully updated.',
                      { version: version }
                  )
                : i18n.t('Error occurred while updating version {{version}}.', {
                      version: version,
                  }),
        ({ success }) => (success ? { success: true } : { critical: true })
    )

    useEffect(() => {
        setGroups(getGroup(version, versionList))
    }, [version])

    const handleButton = () => setOpen(true)

    const handleClose = () => {
        setOpen(false)
        setGroups([])
    }

    const handleSave = () => {
        const updatedList = updateList(versionList, version, groups)

        const updatePromises = [
            mutateList({
                versionList: [...updatedList],
            }),
        ]

        Promise.all(updatePromises)
            .then(() => {
                handleList(prepareAPKListTable(updatedList, userGroups))
                handleClose()
                show({ version: version, success: true })
            })
            .catch(() => show({ version: version, success: false }))
    }

    return (
        <>
            <Button small secondary onClick={handleButton}>
                {i18n.t('Access')}
            </Button>
            {openModal && (
                <AssignModal
                    onHandleSave={handleSave}
                    onHandleClose={handleClose}
                    groups={groups}
                    handleGroups={setGroups}
                />
            )}
        </>
    )
}

AssignUserGroup.propTypes = {
    handleList: PropTypes.func,
    version: PropTypes.string,
    versionList: PropTypes.array,
}

const AssignModal = ({ onHandleClose, onHandleSave, groups, handleGroups }) => (
    <Modal position="middle" onClose={onHandleClose}>
        <ModalTitle>{i18n.t('User Group access')}</ModalTitle>
        <ModalContent>
            <UserGroupAccess
                groups={groups || []}
                onChange={handleGroups}
                hasTitle={!isEmpty(groups)}
            />
        </ModalContent>
        <ModalActions>
            <ButtonStrip end>
                <Button onClick={onHandleClose}>{i18n.t('Cancel')}</Button>
                <Button onClick={onHandleSave} primary>
                    {i18n.t('Save')}
                </Button>
            </ButtonStrip>
        </ModalActions>
    </Modal>
)

AssignModal.propTypes = {
    groups: PropTypes.array,
    handleGroups: PropTypes.func,
    onHandleClose: PropTypes.func,
    onHandleSave: PropTypes.func,
}
