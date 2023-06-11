import semver from 'semver'

export const versionRegex = /^\d+\.\d+(\.\d+)?(\.\d+)?$/

export const isValidVersion = (version) => versionRegex.test(version)

export const padZeros = (version = '0.0.0') => {
    const [major, minor, patch] = version?.split('.')?.map(Number)
    return `${major}.${minor}.${patch || 0}`
}

export const isGreaterVersion = (version, versionToCompare) =>
    semver.gt(padZeros(version), padZeros(versionToCompare))

export const isNotInArrayRegex = (array) =>
    new RegExp(`^(?!(${array.map((v) => `\\b${v}\\b`).join('|')})$).*$`)

export const isNotInArray = (array, element) =>
    isNotInArrayRegex(array).test(element)
