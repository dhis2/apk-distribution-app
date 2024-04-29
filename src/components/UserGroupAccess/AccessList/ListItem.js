import i18n from '@dhis2/d2-i18n'
import {
    Button,
    IconUserGroup16,
    DataTable,
    DataTableRow,
    DataTableCell,
    TableBody,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
export const ListItem = ({ name, onRemove }) => (
    <>
        <DataTable>
            <TableBody>
                <DataTableRow>
                    <DataTableCell>
                        <IconUserGroup16 />
                    </DataTableCell>
                    <DataTableCell align="left">{name}</DataTableCell>
                    <DataTableCell align="right">
                        <Button destructive small onClick={onRemove}>
                            {i18n.t('Remove access')}
                        </Button>
                    </DataTableCell>
                </DataTableRow>
            </TableBody>
        </DataTable>
    </>
)

ListItem.propTypes = {
    name: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
}
