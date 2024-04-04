import isEmpty from 'lodash/isEmpty'

/**
 * Returns an userGroup object that can be considered a Default APK version.
 * The Default version is the last version uploaded that has no defined userGroups.
 * */

export const getDefaultVersion = (list) => {
    const defaultVersion = list.find((e) => isEmpty(e.userGroups) === true)
    defaultVersion.isDefault = true
    return defaultVersion
}

/**
 * Returns userGroup name
 * */

const getUserGroupName = (id, list) => list.find((e) => e.id === id)?.name

/**
 * Returns an updated APK versions list with userGroups names and only one Default APK
 * */

export const prepareAPKListTable = (currentList, userGroups) => {
    const updatedList = currentList.map((item) => {
        if (!isEmpty(item.userGroups)) {
            const groups = item.userGroups.map((groupId) => ({
                id: groupId,
                name: getUserGroupName(groupId, userGroups),
            }))
            return { ...item, userGroups: groups }
        } else {
            const { isDefault, ...rest } = item
            return isDefault ? { ...rest } : { ...item }
        }
    })

    getDefaultVersion(updatedList)
    return updatedList
}
