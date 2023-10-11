import { useDataMutation } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { Button } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { NAMESPACE } from '../../../shared'
import { DialogResetValues } from './DialogResetValues'
import styles from './ResetValues.module.css'

const deleteDataStoreMutation = {
    resource: `dataStore/${NAMESPACE}`,
    type: 'delete',
}

export const ResetValues = ({ disabled }) => {
    const [mutate] = useDataMutation(deleteDataStoreMutation)
    const [openDialog, setOpenDialog] = useState(false)

    const onClose = () => {
        setOpenDialog(false)
    }

    const deleteNamespaceDatastore = async () => {
        onClose()
        await mutate()
        location.reload()
    }

    return (
        <section className={styles.section}>
            <Button
                onClick={() => setOpenDialog(true)}
                disabled={disabled}
                destructive
            >
                {i18n.t('Erase Settings')}
            </Button>

            <DialogResetValues
                onClose={onClose}
                deleteNamespace={deleteNamespaceDatastore}
                openDialog={openDialog}
            />
        </section>
    )
}

ResetValues.propTypes = {
    disabled: PropTypes.bool.isRequired,
}
