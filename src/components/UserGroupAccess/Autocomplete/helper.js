/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered. The
 * function will be called after it stops being called for N milliseconds.
 */

export const debounce = (func, wait, immediate) => {
    let timeout

    return (...args) => {
        const context = this

        const later = () => {
            timeout = null

            if (!immediate) {
                func.apply(context, args)
            }
        }

        const callNow = immediate && !timeout

        clearTimeout(timeout)
        timeout = setTimeout(later, wait)

        if (callNow) {
            func.apply(context, args)
        }
    }
}

/**
 * Returns a list that filters all the elements already used
 * */

export const filterUsedElements = (apiElementList, usedElements) =>
    apiElementList.filter(
        (e) => !usedElements.some((element) => element.id === e.id)
    )
