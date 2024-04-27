import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useState, useEffect, useCallback } from 'react'
import { Autocomplete } from './Autocomplete'
import { debounce, filterUsedElements } from './helper'

const query = {
    search: {
        resource: 'userGroups',
        params: ({ search }) => ({
            query: search,
        }),
    },
}

export const AccessAutocomplete = ({ selected, onSelection, groups }) => {
    const [search, setSearch] = useState('')
    const [showResults, setShowResults] = useState(false)
    const { data, refetch, fetching } = useDataQuery(query, {
        lazy: true,
        onComplete: () => setShowResults(true),
    })

    /**
     * On selection this syncs the displayName of the parent selection to the local input state.
     */

    useEffect(() => setSearch(selected), [selected])

    /**
     * If the search string changes and is truthy, send out a request, otherwise
     * clear the selection.
     */

    const debouncedRefetch = useCallback(debounce(refetch, 250), [refetch])

    useEffect(() => {
        if (search && search === selected) {
            return
        }

        if (search) {
            debouncedRefetch({ search })
        } else {
            onSelection(null)
            setShowResults(false)
        }
    }, [search])

    // Concatenate all the results
    let results = []

    if (data?.search?.userGroups) {
        results = filterUsedElements(data?.search?.userGroups, groups)
    }

    return (
        <Autocomplete
            inputWidth="400px"
            label={i18n.t('User Group')}
            loading={fetching}
            placeholder={i18n.t('Search')}
            search={search}
            searchResults={showResults ? results : []}
            onClose={() => setShowResults(false)}
            onSearch={setSearch}
            onSelect={(id) => {
                onSelection(results.find((result) => result.id === id))
                setShowResults(false)
            }}
        />
    )
}

AccessAutocomplete.propTypes = {
    onSelection: PropTypes.func.isRequired,
    groups: PropTypes.array,
    selected: PropTypes.string,
}
