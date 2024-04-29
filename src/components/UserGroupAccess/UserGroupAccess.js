import PropTypes from 'prop-types'
import React from 'react'
import { AccessAdd } from './AccessAdd'
import { AccessList } from './AccessList'

export const UserGroupAccess = ({
    groups,
    onChange,
    onSave,
    edit,
    hasTitle,
}) => {
    const onAdd = ({ id: newId, name }) => {
        const updatedGroups = [...groups, { id: newId, name }]
        onChange(updatedGroups)
        if (edit) {
            onSave(updatedGroups)
        }
    }

    const onRemove = ({ id: removedId }) => {
        const updatedList = groups.filter((e) => e.id !== removedId)
        onChange([...updatedList])
        if (edit) {
            onSave(updatedList)
        }
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
    edit: PropTypes.bool,
    groups: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ),
    hasTitle: PropTypes.bool,
    onChange: PropTypes.func,
    onSave: PropTypes.func,
}
