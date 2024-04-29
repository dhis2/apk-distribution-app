import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { Title } from '../Title'
import { ListItem } from './ListItem'

export const AccessList = ({ onRemove, groups, hasTitle }) => (
    <>
        {hasTitle && (
            <Title>{i18n.t('Users groups that currently have access')}</Title>
        )}

        <>
            {groups?.map(({ id, name }) => (
                <ListItem
                    key={id}
                    name={name}
                    onRemove={() => onRemove({ id })}
                />
            ))}
        </>
    </>
)

AccessList.propTypes = {
    groups: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    onRemove: PropTypes.func.isRequired,
    hasTitle: PropTypes.bool,
}
