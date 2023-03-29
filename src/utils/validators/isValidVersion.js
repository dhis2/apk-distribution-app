export const versionRegex = /^\d+\.\d+(\.\d+)?$/

export const isValidVersion = (version) => versionRegex.test(version)
