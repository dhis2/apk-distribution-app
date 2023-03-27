import {
    ReactFinalForm,
    InputFieldFF,
    SingleSelectFieldFF,
    MultiSelectFieldFF,
    hasValue,
    Button,
} from '@dhis2/ui'
import React from 'react'
import styles from './Form.module.css'

const dhis2Version = [
    { label: '2.28', value: '2.28' },
    { label: '2.29', value: '2.29' },
    { label: '2.30', value: '2.30' },
    { label: '2.31', value: '2.31' },
    { label: '2.32', value: '2.32' },
    { label: '2.33', value: '2.33' },
    { label: '2.34', value: '2.34' },
    { label: '2.35', value: '2.35' },
    { label: '2.36', value: '2.36' },
    { label: '2.37', value: '2.37' },
    { label: '2.38', value: '2.38' },
    { label: '2.39', value: '2.39' },
]

const androidOSVersion = [
    { label: '7.0', value: '7.0' },
    { label: '8.0', value: '8.0' },
]

const channels = [
    { label: 'Stable', value: 'stable' },
    { label: 'Development', value: 'development' },
]

export const Form = () => {
    const handleSubmit = () => {}

    return (
        <div>
            <h2 className={styles.header}>Create app version</h2>

            <ReactFinalForm.Form onSubmit={handleSubmit}>
                {({ handleSubmit, valid, submitting }) => (
                    <form onSubmit={handleSubmit}>
                        <ReactFinalForm.Field
                            required
                            name="channel"
                            label="Release channel"
                            component={SingleSelectFieldFF}
                            className={styles.field}
                            validate={hasValue}
                            options={channels}
                        />
                        <ReactFinalForm.Field
                            required
                            name="version"
                            label="Version"
                            placeholder="e.g. 1.0.0"
                            component={InputFieldFF}
                            className={styles.field}
                        />
                        <ReactFinalForm.Field
                            required
                            name="minDhisVersion"
                            label="Minimum DHIS2 version"
                            placeholder="Select a version"
                            component={SingleSelectFieldFF}
                            className={styles.field}
                            validate={hasValue}
                            options={dhis2Version}
                        />
                        <ReactFinalForm.Field
                            name="recommendedDhisVersion"
                            label="Recommended DHIS2 version"
                            placeholder="Select a version"
                            component={MultiSelectFieldFF}
                            className={styles.field}
                            options={dhis2Version}
                        />
                        <ReactFinalForm.Field
                            required
                            name="minAndroidVersion"
                            label="Minimum Android version"
                            placeholder="Select a version"
                            component={SingleSelectFieldFF}
                            className={styles.field}
                            validate={hasValue}
                            options={androidOSVersion}
                        />
                        <ReactFinalForm.Field
                            name="recommendedAndroidVersion"
                            label="Recommended Android version"
                            placeholder="Select a version"
                            component={MultiSelectFieldFF}
                            className={styles.field}
                            //validate={maxDhisVersionValidator}
                            options={androidOSVersion}
                        />
                        <ReactFinalForm.Field
                            required
                            name="downloadUrl"
                            label="Download URL"
                            placeholder="e.g. https://dhis2.org/demo"
                            component={InputFieldFF}
                            className={styles.field}
                        />
                        <Button
                            primary
                            type="submit"
                            disabled={!valid || submitting}
                        >
                            Create app version
                        </Button>
                    </form>
                )}
            </ReactFinalForm.Form>
        </div>
    )
}
