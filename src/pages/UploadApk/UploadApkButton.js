import i18n from '@dhis2/d2-i18n'
import { Button } from '@dhis2/ui'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { UploadApk } from './UploadApk'

export const UploadApkButton = ({ updateVersion, versions, handleList }) => {
    const [isOpen, setOpen] = useState(false)

    const uploadVersion = () => {
        setOpen(true)
    }

    const saveNewVersion = (e) => {
        if (!isEmpty(e)) {
            updateVersion({
                version: e.version,
                downloadURL: e.downloadURL,
            })
            handleList([e, ...versions])
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
                />
            )}
        </div>
    )
}

UploadApkButton.propTypes = {
    handleList: PropTypes.func,
    updateVersion: PropTypes.func,
    versions: PropTypes.array,
}
