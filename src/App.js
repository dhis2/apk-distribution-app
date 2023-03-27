import { CenteredContent, CssVariables, CssReset } from '@dhis2/ui'
import React from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import classes from './App.module.css'
import { ApkList } from './pages'

const RouterP = () => (
    <Routes>
        <Route exact path="/" element={<ApkList />} />
        <Route render={() => <Navigate to="/" replace />} />
    </Routes>
)

const MyApp = () => (
    <>
        <HashRouter>
            <CssReset />
            <CssVariables colors spacers />
            <div className={classes.container}>
                <CenteredContent>
                    <RouterP />
                </CenteredContent>
            </div>
        </HashRouter>
    </>
)

export default MyApp
