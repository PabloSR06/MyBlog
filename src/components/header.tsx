import styles from "@css/header.module.css";
import {BuyMeACoffeeUrl, LinkedinUrl, TwitterUrl} from "@data/constants.tsx";
import {CupHotFill, Github, House, Linkedin, Twitter} from "react-bootstrap-icons";

export default function Header() {

    return (
        <header>
            <div className={styles.headerContainer}>
                <ul className={styles.headerSocials}>
                    <li>
                        <a className={styles.headerLinkSocial} href="/">
                            <House className={styles.headerIconSocial}/>
                        </a>
                    </li>
                    <li>
                        <a className={styles.headerLinkSocial} href={LinkedinUrl} target="_blank">
                            <Linkedin className={styles.headerIconSocial}/>
                        </a>
                    </li>
                    <li>
                        <a className={styles.headerLinkSocial} href={TwitterUrl} target="_blank">
                            <Twitter className={styles.headerIconSocial}/>
                        </a>
                    </li>
                    <li>
                        <a className={styles.headerLinkSocial} href="" target="_blank">
                            <Github className={styles.headerIconSocial}/>
                        </a>
                    </li>
                    <li>
                        <a className={styles.headerLinkSocial} href={BuyMeACoffeeUrl} target="_blank">
                            <CupHotFill className={styles.headerIconSocial}/>
                        </a>

                    </li>
                </ul>
            </div>
        </header>
    );
}