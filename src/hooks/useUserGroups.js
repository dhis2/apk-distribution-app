import { useDataQuery } from '@dhis2/app-runtime'

const query = {
    userGroups: {
        resource: 'userGroups',
        params: {
            fields: ['id', 'name', 'displayName'],
            paging: 'false',
        },
    },
}

export const useUserGroups = () => {
    const { data, loading } = useDataQuery(query)

    return {
        loading,
        userGroups: data && data?.userGroups?.userGroups,
    }
}
