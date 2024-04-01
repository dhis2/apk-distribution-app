export const versionRegex = /^\d+\.\d+(\.\d+)?(\.\d+)?$/

export const isValidVersion = (version) => versionRegex.test(version)

export const padZeros = (version = '0.0.0') => {
    const [major, minor, patch, prerelease] = (version || '0.0.0')
        .split('.')
        .map(Number)
    return prerelease
        ? `${major}.${minor}.${patch || 0}.${prerelease}`
        : `${major}.${minor}.${patch || 0}`
}

export const isGreaterVersion = (version1, version2) => {
    const compareVersions = (v1, v2) => v1 - v2
    const v1Components = padZeros(version1).split('.').map(Number)
    const v2Components = padZeros(version2).split('.').map(Number)
    const maxLength = Math.max(v1Components.length, v2Components.length)

    for (let i = 0; i < maxLength; i++) {
        const v1Value = v1Components[i] || 0
        const v2Value = v2Components[i] || 0
        const comparisonResult = compareVersions(v1Value, v2Value)

        if (comparisonResult !== 0) {
            return comparisonResult > 0
        }
    }

    return false
}

export const isNotInArrayRegex = (array) =>
    new RegExp(`^(?!(${array.map((v) => `\\b${v}\\b`).join('|')})$).*$`)

export const isNotInArray = (array, element) =>
    isNotInArrayRegex(array).test(element)
