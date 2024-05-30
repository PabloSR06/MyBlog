import styles from "@css/portrait.module.css";
import {
    BuyMeACoffeeUrl,
    GithubUrl,
    LinkedinUrl,
    Name,
    PictureUrl,
    TwitterUrl
} from "@data/constants.tsx";
import {CupHotFill, Github, Linkedin, Twitter} from "react-bootstrap-icons";

export default function Portrait() {

    return (
        <div className={styles.mainInfo}>
            <img className={styles.mainImage} src={PictureUrl} alt="PabloSR Image"/>
                <h1>{Name}</h1>
                <div className={styles.socialsContainer}>
                    <ul className={styles.socialsUl}>
                        <li className={styles.linkSocial} >
                            <a href={LinkedinUrl} target="_blank">
                                <Linkedin className={styles.iconSocial}/>
                            </a>
                        </li>
                        <li className={styles.linkSocial}>
                            <a href={TwitterUrl} target="_blank">
                                <Twitter className={styles.iconSocial}/>
                            </a>
                        </li>
                        <li className={styles.linkSocial}>
                            <a href={GithubUrl} target="_blank">
                                <Github className={styles.iconSocial}/>
                            </a>
                        </li>
                        <li className={styles.linkSocial}>
                            <a href={BuyMeACoffeeUrl} target="_blank">
                                <CupHotFill className={styles.iconSocial}/>
                            </a>
                        </li>
                    </ul>
                </div>
        </div>
    );
}