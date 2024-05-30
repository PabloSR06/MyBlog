import Header from "@components/header.tsx";
import styles from "@css/notFound.module.css";


export default function NotFoundPage() {
    return (

        <>
            <Header/>
            <div className={styles.notFoundContainer}>
                <h1 className={styles.notFound}>404</h1>
                <h2>Ups something went wrong</h2>
            </div>
        </>

    );
}