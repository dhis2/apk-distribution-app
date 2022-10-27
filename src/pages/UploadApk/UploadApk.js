import i18n from '@dhis2/d2-i18n'
import {Card, Divider, CircularLoader, Modal, ModalContent} from '@dhis2/ui'
import classnames from 'classnames'

import styles from "../ApkList/ApkList.module.css";
import {AboutSection, HeaderContent} from "../ApkList/Sections";

import React from "react";
import {Form} from "./Form";

export const UploadApk = () => {


    return (
        /*<section className={classnames(styles.appCardSection, styles.appCard)}>
            {/!*<p>Version</p>
                <p>Minimum DHIS2 version</p>
                <p>Recommended DHIS2 version</p>
                <p>Minimum Android version</p>
                <p>Recommended Android version</p>
                <p>Download URL</p>
                <button>create app version</button>*!/}
            <Form/>
        </section>*/
        <Form/>
    )
}

export const NewVersion = ({isOpen, handleClose}) => (
    isOpen && (
    <Modal onClose={handleClose}>
        <ModalContent>
            <Form/>
        </ModalContent>
    </Modal>
)
)