import orderBy from 'lodash/orderBy'
import { prepareAPK, prepareAPKListToSave } from '../../pages/UploadApk/helper'

/**
 * Returns a list of APKs with a specific version updated
 * */
export const updateList = (list, version, groups) => {
    const updatedItemIndex = list.findIndex((e) => e.version === version)
    const updatedList = [...list]

    if (updatedItemIndex !== -1) {
        updatedList[updatedItemIndex] = prepareAPK(
            updatedList[updatedItemIndex],
            groups
        )
    }

    return orderVersions(prepareAPKListToSave(updatedList))
}

/**
 * Returns a list with elements order by version number
 * */
export const orderVersions = (list) => orderBy(list, 'version', 'desc')

/**
 * Returns userGroups based on id
 * */
export const getGroup = (id, list) =>
    list.find((e) => e.version === id)?.userGroups
