export const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/

export const isValidURL = (url) => urlRegex.test(url)
