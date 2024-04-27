import PropTypes from 'prop-types'
import React from 'react'
import { AccessAdd } from './AccessAdd'
import { AccessList } from './AccessList'

export const UserGroupAccess = ({ groups, onChange, hasTitle }) => {
    const onAdd = ({ id: newId, name }) => {
        onChange([...groups, { id: newId, name }])
    }

    const onRemove = ({ id: removedId }) => {
        const updatedList = groups.filter((e) => e.id !== removedId)
        onChange([...updatedList])
    }

    return (
        <>
            <AccessAdd onAdd={onAdd} groups={groups || []} />
            <AccessList
                groups={groups || []}
                onRemove={onRemove}
                hasTitle={hasTitle}
            />
        </>
    )
}

UserGroupAccess.propTypes = {
    groups: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ),
    hasTitle: PropTypes.bool,
    onChange: PropTypes.func,
}
