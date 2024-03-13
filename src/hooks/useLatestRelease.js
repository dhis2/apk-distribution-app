import { useEffect, useState } from 'react'
import { padZeros } from '../utils'

export const useLatestRelease = () => {
    const githubURL =
        'https://api.github.com/repos/dhis2/dhis2-android-capture-app/releases/latest'
    const [release, setRelease] = useState(null)

    useEffect(() => {
        const fetchRelease = async () => {
            const response = await fetch(githubURL)
            const data = await response.json()
            setRelease({
                downloadURL: data?.assets[0].browser_download_url,
                version: padZeros(data?.tag_name),
            })
        }

        fetchRelease()
    }, [])

    return release
}
