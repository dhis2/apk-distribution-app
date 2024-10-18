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
import React, { useState } from 'react'
import { UserGroupAccess } from '../../../components'
import { useUpdateVersions, useUserGroups } from '../../../hooks'
import { prepareAPKListTable } from '../helper'
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

    const handleButton = () => {
        setOpen(true)
        setGroups(getGroup(version, versionList))
    }

    const handleClose = () => {
        setOpen(false)
        setGroups([])
    }

    const handleSave = (currentGroups) => {
        const updatedList = updateList(versionList, version, currentGroups)

        const updatePromises = [
            mutateList({
                versionList: [...updatedList],
            }),
        ]

        Promise.all(updatePromises)
            .then(() => {
                handleList(prepareAPKListTable(updatedList, userGroups))
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
                edit={true}
                onSave={onHandleSave}
            />
        </ModalContent>
        <ModalActions>
            <ButtonStrip end>
                <Button onClick={onHandleClose}>{i18n.t('Close')}</Button>
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
