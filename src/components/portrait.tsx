import styles from "@css/portrait.module.css";
import {
    BuyMeACoffeeUrl,
    GithubUrl,
    LinkedinUrl,
    Name,
    PictureUrl,
} from "@data/constants.tsx";
import { CupHotFill, Github, Linkedin } from "react-bootstrap-icons";
import { AltBuyMeACoffee, AltGithub, AltLinkedin } from "@data/texts.ts";

const externalLinkProps = {
    target: "_blank",
    rel: "noopener noreferrer",
} as const;

export default function Portrait() {

    return (
        <div className={styles.mainInfo}>
            <img
                className={styles.mainImage}
                src={PictureUrl}
                alt={`Portrait of ${Name}`}
                width={200}
                height={200}
                loading="eager"
                decoding="async"
            />
            <h1>{Name}</h1>
            <nav className={styles.socialsContainer} aria-label="Social links">
                <ul className={styles.socialsUl}>
                    <li className={styles.linkSocial}>
                        <a href={LinkedinUrl} {...externalLinkProps} aria-label={AltLinkedin}>
                            <Linkedin className={styles.iconSocial} aria-hidden="true" focusable="false" />
                        </a>
                    </li>
                    {/* <li className={styles.linkSocial}>
                        <a href={TwitterUrl} {...externalLinkProps} aria-label={AltTwitter}>
                            <Twitter className={styles.iconSocial} aria-hidden="true" focusable="false" />
                        </a>
                    </li> */}
                    <li className={styles.linkSocial}>
                        <a href={GithubUrl} {...externalLinkProps} aria-label={AltGithub}>
                            <Github className={styles.iconSocial} aria-hidden="true" focusable="false" />
                        </a>
                    </li>
                    <li className={styles.linkSocial}>
                        <a href={BuyMeACoffeeUrl} {...externalLinkProps} aria-label={AltBuyMeACoffee}>
                            <CupHotFill className={styles.iconSocial} aria-hidden="true" focusable="false" />
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}