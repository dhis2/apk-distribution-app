import i18n from '@dhis2/d2-i18n'
import { Button, colors, spacers } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { AccessAutocomplete } from './Autocomplete'
import { Title } from './Title'

export const AccessAdd = ({ onAdd, groups }) => {
    const [entity, setEntity] = useState(null)

    const onSubmit = () => {
        onAdd({
            id: entity.id,
            name: entity.displayName || entity.name,
        })

        setEntity(null)
    }

    return (
        <>
            <Title>{i18n.t('Give access to a user group')}</Title>
            <div className="form-wrapper">
                <AccessAutocomplete
                    selected={entity?.displayName || entity?.name}
                    onSelection={setEntity}
                    groups={groups}
                />

                <Button type="submit" disabled={!entity} onClick={onSubmit}>
                    {i18n.t('Give access')}
                </Button>
            </div>
            <style>{`
                .form-wrapper {
                    color: ${colors.grey900};
                    margin-bottom: 21px;
                    padding: 8px 12px;
                    border-radius: 5px;
                    display: flex;
                    align-items: flex-end;
                    gap: ${spacers.dp8};
                }
            `}</style>
        </>
    )
}

AccessAdd.propTypes = {
    onAdd: PropTypes.func.isRequired,
    groups: PropTypes.array,
}
