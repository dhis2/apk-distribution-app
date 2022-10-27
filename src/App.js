import { CenteredContent, CssVariables, CssReset} from '@dhis2/ui'
import React from 'react'
import classes from './App.module.css'
import {ApkList, UploadApk} from "./pages";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";

const RouterP = () => (
    <Routes>
        <Route exact path="/" element={<ApkList/>} />
        <Route path="/new" element={<UploadApk/>} />
        {/*No-match route - redirect to index*/}
        <Route render={() => <Navigate to="/" replace/>} />
    </Routes>
)

const MyApp = () => (
    <>
        <HashRouter>
            <CssReset />
            <CssVariables colors spacers />
            <div className={classes.container}>
                <CenteredContent>
                    <RouterP/>
                </CenteredContent>
            </div>
        </HashRouter>
    </>
)

export default MyApp
