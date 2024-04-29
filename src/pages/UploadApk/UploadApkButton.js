import i18n from '@dhis2/d2-i18n'
import { Button } from '@dhis2/ui'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useUserGroups } from '../../hooks'
import { prepareAPKListTable } from '../ApkList/helper'
import { UploadApk } from './UploadApk'

export const UploadApkButton = ({
    updateVersion,
    versions,
    handleList,
    latest,
}) => {
    const { userGroups } = useUserGroups()
    const [isOpen, setOpen] = useState(false)

    const uploadVersion = () => {
        setOpen(true)
    }

    const saveNewVersion = (e, list) => {
        if (!isEmpty(e)) {
            updateVersion({
                version: e.version,
                downloadURL: e.downloadURL,
            })
            handleList(prepareAPKListTable(list, userGroups))
        }
        setOpen(false)
    }

    return (
        <div>
            <Button onClick={uploadVersion}>
                {i18n.t('Upload new version')}
            </Button>

            {isOpen && (
                <UploadApk
                    handleClose={saveNewVersion}
                    isOpen={isOpen}
                    versionList={versions}
                    latest={latest}
                />
            )}
        </div>
    )
}

UploadApkButton.propTypes = {
    handleList: PropTypes.func,
    latest: PropTypes.object,
    updateVersion: PropTypes.func,
    versions: PropTypes.array,
}
