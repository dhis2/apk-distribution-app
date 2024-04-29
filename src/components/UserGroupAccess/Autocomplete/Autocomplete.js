import i18n from '@dhis2/d2-i18n'
import { InputField, Menu, MenuItem, Help, Popper } from '@dhis2/ui'
import useSize from '@react-hook/size'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { MenuPopup } from './MenuPopup'

export const Autocomplete = ({
    dataTest,
    inputWidth,
    label,
    loading,
    onClose,
    onSearch,
    onSelect,
    placeholder,
    search,
    searchResults,
    warning,
}) => {
    const wrapper = useRef(null)
    const [menuWidth] = useSize(wrapper)

    return (
        <>
            <div ref={wrapper}>
                <InputField
                    label={label}
                    loading={loading}
                    placeholder={placeholder}
                    onChange={({ value }) => onSearch(value)}
                    value={search}
                    inputWidth={inputWidth}
                />
            </div>
            {warning && (
                <Popper placement="bottom-start" reference={wrapper}>
                    <Help error>
                        {i18n.t('No user group match the search criteria')}
                    </Help>
                </Popper>
            )}
            {searchResults.length > 0 && (
                <MenuPopup
                    onClick={onClose}
                    menuWidth={`${menuWidth}px`}
                    menuRef={wrapper}
                    dataTest={`${dataTest}-menu`}
                >
                    <Menu>
                        {searchResults.map((result) => (
                            <MenuItem
                                key={result.id}
                                label={result.displayName}
                                value={result.id}
                                onClick={({ value }) => onSelect(value)}
                            />
                        ))}
                    </Menu>
                </MenuPopup>
            )}
        </>
    )
}

Autocomplete.defaultProps = {
    dataTest: 'dhis2-sharingdialog-autocomplete',
}

Autocomplete.propTypes = {
    searchResults: PropTypes.arrayOf(
        PropTypes.shape({
            displayName: PropTypes.string,
            id: PropTypes.string,
        })
    ).isRequired,
    dataTest: PropTypes.string,
    inputWidth: PropTypes.string,
    label: PropTypes.string,
    loading: PropTypes.bool,
    placeholder: PropTypes.string,
    search: PropTypes.string,
    warning: PropTypes.bool,
    onClose: PropTypes.func,
    onSearch: PropTypes.func,
    onSelect: PropTypes.func,
}
