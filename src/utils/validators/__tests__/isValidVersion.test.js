import { isValidVersion } from '../isValidVersion'

test('"1.2.3" is a valid URL', () => {
    const url = '1.2.3'
    expect(isValidVersion(url)).toBeTruthy()
})

test('"0.2.10" is a valid URL', () => {
    const url = '0.2.10'
    expect(isValidVersion(url)).toBeTruthy()
})

test('"1.22" is a valid URL', () => {
    const url = '1.22'
    expect(isValidVersion(url)).toBeTruthy()
})

test('"1.2.x" is a valid URL', () => {
    const url = '1.2.x'
    expect(isValidVersion(url)).toBeFalsy()
})

test('"1.a.x" is a valid URL', () => {
    const url = '1.a.x'
    expect(isValidVersion(url)).toBeFalsy()
})
