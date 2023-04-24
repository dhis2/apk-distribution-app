import { useDataMutation, useDataQuery } from '@dhis2/app-runtime'
import { LATEST_VERSION, NAMESPACE, VERSIONS } from '../shared'

const query = {
    [LATEST_VERSION]: {
        resource: `dataStore/${NAMESPACE}/${LATEST_VERSION}`,
    },
    [VERSIONS]: {
        resource: `dataStore/${NAMESPACE}/${VERSIONS}`,
    },
}

export const useDataStore = () => {
    const { loading, data } = useDataQuery(query)

    return {
        loading,
        [LATEST_VERSION]: data?.[LATEST_VERSION],
        [VERSIONS]: data?.[VERSIONS].versions,
    }
}

/**
 * update data store
 * key: latestVersion
 * key: versions
 * */

export const saveLatestVersion = {
    resource: `dataStore/${NAMESPACE}/${LATEST_VERSION}`,
    type: 'update',
    data: ({ version }) => ({ ...version }),
}

export const saveVersions = {
    resource: `dataStore/${NAMESPACE}/${VERSIONS}`,
    type: 'update',
    data: ({ versionList }) => ({ versions: versionList }),
}

export const useUpdateVersions = () => {
    const [mutateVersion] = useDataMutation(saveLatestVersion)
    const [mutateList] = useDataMutation(saveVersions)

    return {
        mutateVersion,
        mutateList,
    }
}
