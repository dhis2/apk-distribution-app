import PropTypes from 'prop-types'
import React from 'react'
import capture1 from '../../img/capture-app.webp'
import capture2 from '../../img/capture-app2.webp'
import capture3 from '../../img/capture-app3.webp'
import capture4 from '../../img/capture-app4.webp'
import styles from './AppIcon.module.css'

export const AppIcon = ({ src }) => (
    <div className={styles.appIcon}>
        <img alt="App logo" src={src} loading="lazy" />
    </div>
)

export const Icons = () => (
    <div className={styles.appIcon}>
        <img alt="App logo1" src={capture1} loading="lazy" />
        <img alt="App logo2" src={capture2} loading="lazy" />
        <img alt="App logo3" src={capture3} loading="lazy" />
        <img alt="App logo4" src={capture4} loading="lazy" />
    </div>
)

AppIcon.propTypes = {
    src: PropTypes.string,
}
