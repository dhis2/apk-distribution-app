import i18n from '@dhis2/d2-i18n'
import { Button} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

export const DownloadButton = ({url, ...props}) => (
    <a
        download
        href={url}
        tabIndex="-1"
    >
        <Button small {...props}>
            {i18n.t('Download')}
        </Button>
    </a>
)

DownloadButton.propTypes = {
    url: PropTypes.string,
}
