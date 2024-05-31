import styles from "@css/header.module.css";
import {BuyMeACoffeeUrl, LinkedinUrl, TwitterUrl} from "@data/constants.tsx";
import {CupHotFill, Github, House, Linkedin, Twitter} from "react-bootstrap-icons";
import {AltBuyMeACoffe, AltGithub, AltHome, AltLinkedin, AltTwitter} from "@data/texts.ts";

export default function Header() {

    return (
        <header>
            <div className={styles.headerContainer}>
                <ul className={styles.headerSocials}>
                    <li>
                        <a className={styles.headerLinkSocial} href="/" aria-label={AltHome}>
                            <House className={styles.headerIconSocial}/>
                        </a>
                    </li>
                    <li>
                        <a className={styles.headerLinkSocial} href={LinkedinUrl} target="_blank" aria-label={AltLinkedin}>
                            <Linkedin className={styles.headerIconSocial}/>
                        </a>
                    </li>
                    <li>
                        <a className={styles.headerLinkSocial} href={TwitterUrl} target="_blank" aria-label={AltTwitter}>
                            <Twitter className={styles.headerIconSocial}/>
                        </a>
                    </li>
                    <li>
                        <a className={styles.headerLinkSocial} href="" target="_blank" aria-label={AltGithub}>
                            <Github className={styles.headerIconSocial}/>
                        </a>
                    </li>
                    <li>
                        <a className={styles.headerLinkSocial} href={BuyMeACoffeeUrl} target="_blank" aria-label={AltBuyMeACoffe}>
                            <CupHotFill className={styles.headerIconSocial}/>
                        </a>

                    </li>
                </ul>
            </div>
        </header>
    );
}