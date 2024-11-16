import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import { isGreaterVersion } from '../../utils'

/**
 * Returns an userGroup object that can be considered a Default APK version.
 * The Default version is the last version uploaded that has no defined userGroups.
 * */

export const getDefaultVersion = (list) => {
    const defaultVersion = list.find((e) => isEmpty(e.userGroups) === true)
    if (defaultVersion) {
        defaultVersion.isDefault = true
        return defaultVersion
    }
}

/**
 * Returns userGroup name
 * */

const getUserGroupName = (id, list) => list.find((e) => e.id === id)?.name

/**
 * Returns an updated APK versions list with userGroups names and only one Default APK
 * */

export const prepareAPKListTable = (currentList, userGroups) => {
    if (isEmpty(currentList)) {
        return []
    }

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

/**
 * Returns the first APK (object) where at least one group id matches any of the IDs in the list
 * */

const findApkByIds = (array, ids) => {
    return array.find(
        (item) =>
            item.userGroups &&
            item.userGroups.some((group) => {
                const idList = map(ids, 'id')
                return idList.includes(group.id)
            })
    )
}

/**
 * Returns the latest APK
 * */

export const getLatestDownloadApk = (apkList, userGroups) => {
    const apkBasedOnUser = findApkByIds(apkList, userGroups)
    const apkDefault = apkList.find((item) => item.isDefault === true)

    if (
        !isEmpty(apkBasedOnUser) &&
        isGreaterVersion(apkBasedOnUser?.version, apkDefault?.version)
    ) {
        return {
            version: apkBasedOnUser?.version,
            url: apkBasedOnUser?.downloadURL,
            isInitialDefault: true,
        }
    }

    if (isEmpty(apkBasedOnUser) && !isEmpty(apkList) && isEmpty(apkDefault)) {
        return {
            isInitialDefault: false,
        }
    }

    return {
        version: apkDefault?.version,
        url: apkDefault?.downloadURL,
        isInitialDefault: true,
    }
}
