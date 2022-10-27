import i18n from '@dhis2/d2-i18n'
import {Button} from '@dhis2/ui'
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {NewVersion} from "./UploadApk";

export const UploadApkButton = () => {
    const [isOpen, setOpen] = useState(false)

    const uploadVersion = () => {
        setOpen(true)
    }

    const saveNewVersion = () => {
        setOpen(false)
    }

    return (
        <div>
            <Button onClick={uploadVersion}>
                {/*<Link to="new">{i18n.t('Upload new version')}</Link>*/}
                {i18n.t('Upload new version')}
            </Button>

            {isOpen && <NewVersion handleClose={saveNewVersion} isOpen={isOpen}/>}
        </div>
    )
}
