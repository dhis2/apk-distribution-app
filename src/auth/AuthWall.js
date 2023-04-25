import { useAlert } from '@dhis2/app-runtime'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { FirstTimeSetup } from '../components'
import { useCreateDataStore, useLatestRelease } from '../hooks'
import { useIsAuthorized } from './useIsAuthorized'

const AuthWall = ({ children }) => {
    const { hasAuthority, hasNamespace } = useIsAuthorized()
    const release = useLatestRelease()
    const { mutateVersion, mutateList } = useCreateDataStore()
    const [hasDatastoreAccess, setDatastoreAccess] = useState(hasNamespace)
    const { show } = useAlert(
        ({ success }) =>
            success
                ? 'The initial configuration of the app has been completed and it is now ready to use.'
                : 'The initial configuration of the app encountered an error and it cannot be used at this time.',
        ({ success }) => (success ? { success: true } : { critical: true })
    )

    const handleSave = () => {
        const createPromises = [
            mutateVersion({ version: release }),
            mutateList(),
        ]

        Promise.all(createPromises)
            .then((response) => {
                setDatastoreAccess(
                    200 <= response[0].httpStatusCode &&
                        200 <= response[1].httpStatusCode &&
                        response[0].httpStatusCode < 300 &&
                        response[1].httpStatusCode < 300
                )
                show({ success: true })
            })
            .catch(() => {
                show({ success: false })
            })
    }

    if (!hasDatastoreAccess) {
        return (
            <>
                <FirstTimeSetup
                    handleSave={handleSave}
                    disable={!hasAuthority}
                />
            </>
        )
    }

    return children
}

AuthWall.propTypes = {
    children: PropTypes.node.isRequired,
}

export { AuthWall }
