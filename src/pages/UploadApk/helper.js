import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import { padZeros } from '../../utils'
import { getDefaultVersion } from '../ApkList/helper'

/**
 * Returns an object with the APK info
 * */
export const prepareAPK = (settings, groups) => {
    const baseData = {
        version: padZeros(settings.version),
        downloadURL: settings.downloadURL,
        androidOSVersion: settings.androidOSVersion,
    }

    return isEmpty(groups)
        ? { ...baseData, isDefault: true }
        : { ...baseData, userGroups: groups }
}

/**
 * Returns a list of ids
 * */
const groupsId = (groups) => map(groups, 'id')

/**
 * Returns a list of APK that using the valid format to use in Datastore.
 * An APK version with userGroups should only have the ids.
 * If the APK version doesn't have a userGroup and is the last version uploaded, it should be considered as Default version.
 * */
export const prepareAPKListToSave = (list) => {
    if (isEmpty(list)) {
        return []
    }

    const updatedList = list.map((item) => {
        if (!isEmpty(item.userGroups)) {
            return { ...item, userGroups: groupsId(item.userGroups) }
        } else {
            const { isDefault, ...rest } = item
            return isDefault ? { ...rest } : { ...item }
        }
    })
    getDefaultVersion(updatedList)
    return updatedList
}
