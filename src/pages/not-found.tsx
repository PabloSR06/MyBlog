import Header from "@components/header.tsx";
import styles from "@css/notFound.module.css";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <>
            <Helmet>
                <title>404 — Page not found</title>
                <meta name="robots" content="noindex" />
            </Helmet>
            <Header />
            <main className={styles.notFoundContainer} role="main">
                <h1 className={styles.notFound}>404</h1>
                <h2>Oops, something went wrong</h2>
                <p>
                    <Link to="/">Go back to the home page</Link>
                </p>
            </main>
        </>
    );
}