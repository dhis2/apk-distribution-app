import {
    isGreaterVersion,
    isNotInArray,
    isValidVersion,
    padZeros,
} from '../isValidVersion'

test('"1.2.3" is a valid version', () => {
    const version = '1.2.3'
    expect(isValidVersion(version)).toBeTruthy()
})

test('"0.2.10" is a valid version', () => {
    const version = '0.2.10'
    expect(isValidVersion(version)).toBeTruthy()
})

test('"1.22" is a valid version', () => {
    const version = '1.22'
    expect(isValidVersion(version)).toBeTruthy()
})

test('"1.22.4.1" is a valid version', () => {
    const version = '1.22.4.1'
    expect(isValidVersion(version)).toBeTruthy()
})

test('"1.2.x" is not a valid version', () => {
    const version = '1.2.x'
    expect(isValidVersion(version)).toBeFalsy()
})

test('"1.a.x" is not a valid version', () => {
    const version = '1.a.x'
    expect(isValidVersion(version)).toBeFalsy()
})

test('"10.2.3" is higher than 8.5', () => {
    const versionToCompare = '10.2.3'
    const version = '8.5'
    expect(isGreaterVersion(versionToCompare, version)).toBeTruthy()
})

test('"10.4.2" is higher than 10.4.1.1', () => {
    const versionToCompare = '10.4.2'
    const version = '10.4.1.1'
    expect(isGreaterVersion(versionToCompare, version)).toBeTruthy()
})

test('"10.4.1.3" is higher than 10.4.1.1', () => {
    const versionToCompare = '10.4.1.3'
    const version = '10.4.1.1'
    expect(isGreaterVersion(versionToCompare, version)).toBeTruthy()
})

test('"8.2.3" is not higher than 10.0', () => {
    const versionToCompare = '8.2.3'
    const version = '10.0'
    expect(isGreaterVersion(versionToCompare, version)).toBeFalsy()
})

test('"5.1.1" is not higher than 10.0', () => {
    const versionToCompare = '5.1.1'
    const version = '10.0'
    expect(isGreaterVersion(versionToCompare, version)).toBeFalsy()
})

test('"10.4.1" is not higher than 10.4.2', () => {
    const versionToCompare = '10.4.1'
    const version = '10.4.2'
    expect(isGreaterVersion(versionToCompare, version)).toBeFalsy()
})

test('"10.4.1.1" is not higher than 10.4.2', () => {
    const versionToCompare = '10.4.1.1'
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

test('2.3.4 parsed version is 2.3.4', () => {
    expect(padZeros('2.3.4')).toBe('2.3.4')
})

test('2.3 parsed version is 2.3.0', () => {
    expect(padZeros('2.3')).toBe('2.3.0')
})

test('2.3.4.5 parsed version is 2.3.4.5', () => {
    expect(padZeros('2.3.4.5')).toBe('2.3.4.5')
})
