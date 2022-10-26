import { CenteredContent, CssVariables, CssReset} from '@dhis2/ui'
import React from 'react'
import classes from './App.module.css'
import {ApkList} from "./pages";

const MyApp = () => (
    <>
        <CssReset />
        <CssVariables colors spacers />
        <div className={classes.container}>
            <CenteredContent>
                <ApkList/>
            </CenteredContent>
        </div>
    </>
)

export default MyApp
