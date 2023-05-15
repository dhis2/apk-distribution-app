import i18n from '@dhis2/d2-i18n'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableRowHead,
    TableCellHead,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { DownloadButton } from '../DownloadButton/DownloadButton'
import styles from './WebTable.module.css'

export const WebTable = ({ versions, disabled }) => (
    <Table>
        <TableHead>
            <TableRowHead>
                <TableCellHead dense>{i18n.t('App Version')}</TableCellHead>
                <TableCellHead dense colSpan="2">
                    {i18n.t('Android OS version')}
                </TableCellHead>
                {!disabled && <TableCellHead dense />}
            </TableRowHead>
            <TableRowHead>
                <TableCellHead dense colSpan="1" />
                <TableCellHead dense className={styles.subtitle}>
                    {i18n.t('Minimum')}
                </TableCellHead>
                <TableCellHead dense className={styles.subtitle}>
                    {i18n.t('Recommended')}
                </TableCellHead>
                {!disabled && <TableCellHead dense />}
            </TableRowHead>
        </TableHead>
        <TableBody>
            {versions.map(({ version, androidOSVersion, downloadURL }) => (
                <TableRow key={version}>
                    <TableCell>{version}</TableCell>
                    <TableCell>{androidOSVersion.min}</TableCell>
                    <TableCell>{androidOSVersion.recommended}</TableCell>
                    {!disabled && (
                        <TableCell>
                            <DownloadButton url={downloadURL} secondary />
                        </TableCell>
                    )}
                </TableRow>
            ))}
        </TableBody>
    </Table>
)

WebTable.propTypes = {
    disabled: PropTypes.bool,
    versions: PropTypes.array,
}
