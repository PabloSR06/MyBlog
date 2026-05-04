import styles from "@css/header.module.css";
import { BuyMeACoffeeUrl, GithubUrl, LinkedinUrl } from "@data/constants.tsx";
import { CupHotFill, Github, House, Linkedin } from "react-bootstrap-icons";
import { AltBuyMeACoffee, AltGithub, AltHome, AltLinkedin } from "@data/texts.ts";

const externalLinkProps = {
    target: "_blank",
    rel: "noopener noreferrer",
} as const;

export default function Header() {

    return (
        <header>
            <nav className={styles.headerContainer} aria-label="Primary">
                <ul className={styles.headerSocials}>
                    <li>
                        <a className={styles.headerLinkSocial} href="/" aria-label={AltHome}>
                            <House className={styles.headerIconSocial} aria-hidden="true" focusable="false" />
                        </a>
                    </li>
                    <li>
                        <a className={styles.headerLinkSocial} href={LinkedinUrl} {...externalLinkProps} aria-label={AltLinkedin}>
                            <Linkedin className={styles.headerIconSocial} aria-hidden="true" focusable="false" />
                        </a>
                    </li>
                    {/* <li>
                        <a className={styles.headerLinkSocial} href={TwitterUrl} {...externalLinkProps} aria-label={AltTwitter}>
                            <Twitter className={styles.headerIconSocial} aria-hidden="true" focusable="false" />
                        </a>
                    </li> */}
                    <li>
                        <a className={styles.headerLinkSocial} href={GithubUrl} {...externalLinkProps} aria-label={AltGithub}>
                            <Github className={styles.headerIconSocial} aria-hidden="true" focusable="false" />
                        </a>
                    </li>
                    <li>
                        <a className={styles.headerLinkSocial} href={BuyMeACoffeeUrl} {...externalLinkProps} aria-label={AltBuyMeACoffee}>
                            <CupHotFill className={styles.headerIconSocial} aria-hidden="true" focusable="false" />
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}