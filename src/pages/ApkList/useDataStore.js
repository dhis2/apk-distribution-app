import { useDataQuery } from '@dhis2/app-runtime'

const query = {
    dataStore: {
        resource: 'dataStore/apk-distribution/versions',
    },
}

export const useDataStore = () => {
    const { loading, data } = useDataQuery(query)

    return {
        loading,
        versionsData: data && data.dataStore,
    }
}
