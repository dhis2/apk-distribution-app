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
import styles from './VersionTable.module.css'

export const VersionTable = ({ versions }) => (
    <Table className={styles.table}>
        <TableHead>
            <TableRowHead>
                <TableCellHead dense>{i18n.t('App Version')}</TableCellHead>
                <TableCellHead>{i18n.t('Channel')}</TableCellHead>
                <TableCellHead colSpan="2">
                    {i18n.t('DHIS2 version')}
                </TableCellHead>
                <TableCellHead colSpan="2">
                    {i18n.t('Android OS version')}
                </TableCellHead>
                <TableCellHead></TableCellHead>
            </TableRowHead>
            <TableRowHead>
                <TableCellHead colSpan="2" />
                <TableCellHead dense className={styles.subtitle}>
                    {i18n.t('Minimum')}
                </TableCellHead>
                <TableCellHead dense className={styles.subtitle}>
                    {i18n.t('Recommended')}
                </TableCellHead>
                <TableCellHead dense className={styles.subtitle}>
                    {i18n.t('Minimum')}
                </TableCellHead>
                <TableCellHead dense className={styles.subtitle}>
                    {i18n.t('Recommended')}
                </TableCellHead>
                <TableCellHead></TableCellHead>
            </TableRowHead>
        </TableHead>
        <TableBody>
            {versions.map(
                ({
                    version,
                    channel,
                    dhis2Version,
                    androidOSVersion,
                    downloadURL,
                }) => (
                    <TableRow key={version}>
                        <TableCell>{version}</TableCell>
                        <TableCell className={styles.channelNameCell}>
                            {channel}
                        </TableCell>
                        <TableCell>{dhis2Version.min}</TableCell>
                        <TableCell>{dhis2Version.recommended}</TableCell>
                        <TableCell>{androidOSVersion.min}</TableCell>
                        <TableCell>{androidOSVersion.recommended}</TableCell>
                        <TableCell>
                            <DownloadButton href={downloadURL} secondary />
                        </TableCell>
                    </TableRow>
                )
            )}
        </TableBody>
    </Table>
)

VersionTable.propTypes = {
    versions: PropTypes.array,
}
