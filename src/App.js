import { CenteredContent, CssVariables, CssReset } from '@dhis2/ui'
import React from 'react'
import { AppProvider } from './app-context'
import classes from './App.module.css'
import { AuthWall } from './auth'
import { ApkList } from './pages'

const App = () => (
    <>
        <CssReset />
        <CssVariables colors spacers />
        <AppProvider>
            <AuthWall>
                <div className={classes.container}>
                    <CenteredContent>
                        <ApkList />
                    </CenteredContent>
                </div>
            </AuthWall>
        </AppProvider>
    </>
)

export default App
