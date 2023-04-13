import {
    isGreaterVersion,
    isNotInArray,
    isValidVersion,
} from '../isValidVersion'

test('"1.2.3" is a valid version', () => {
    const url = '1.2.3'
    expect(isValidVersion(url)).toBeTruthy()
})

test('"0.2.10" is a valid version', () => {
    const url = '0.2.10'
    expect(isValidVersion(url)).toBeTruthy()
})

test('"1.22" is a valid version', () => {
    const url = '1.22'
    expect(isValidVersion(url)).toBeTruthy()
})

test('"1.2.x" is a valid version', () => {
    const url = '1.2.x'
    expect(isValidVersion(url)).toBeFalsy()
})

test('"1.a.x" is a valid version', () => {
    const url = '1.a.x'
    expect(isValidVersion(url)).toBeFalsy()
})

test('"10.2.3" is greater than 8.5', () => {
    const versionToCompare = '10.2.3'
    const version = '8.5'
    expect(isGreaterVersion(versionToCompare, version)).toBeTruthy()
})

test('"8.2.3" is not greater than 10.0', () => {
    const versionToCompare = '8.2.3'
    const version = '10.0'
    expect(isGreaterVersion(versionToCompare, version)).toBeFalsy()
})

test('"5.1.1" is not greater than 10.0', () => {
    const versionToCompare = '5.1.1'
    const version = '10.0'
    expect(isGreaterVersion(versionToCompare, version)).toBeFalsy()
})

test('"10.4.1" is not greater than 10.4.2', () => {
    const versionToCompare = '10.4.1'
    const version = '10.4.2'
    expect(isGreaterVersion(versionToCompare, version)).toBeFalsy()
})

test('item4 is not part of the array', () => {
    const array = ['item1', 'item2', 'item3']
    const element = 'item4'
    expect(isNotInArray(array, element)).toBeTruthy()
})

test('item3 is part of the array', () => {
    const array = ['item1', 'item2', 'item3']
    const element = 'item3'
    expect(isNotInArray(array, element)).toBeFalsy()
})
