import { createContext } from 'react'

const AppContext = createContext({
    authorities: [],
    username: '',
    userGroups: [],
    dataStore: [],
})

export { AppContext }
