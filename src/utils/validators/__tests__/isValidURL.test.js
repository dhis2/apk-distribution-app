import { isValidURL } from '../isValidURL'

test('"https://debug.dhis2.org" is a valid URL', () => {
    const url = 'https://debug.dhis2.org'
    expect(isValidURL(url)).toBeTruthy()
})

test('"http://debug.dhis2.org" is a valid URL', () => {
    const url = 'http://debug.dhis2.org'
    expect(isValidURL(url)).toBeTruthy()
})

test('"www.google.com" is a not valid URL', () => {
    const url = 'www.google.com'
    expect(isValidURL(url)).toBeFalsy()
})
