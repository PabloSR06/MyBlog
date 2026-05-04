import styles from "@css/postList.module.css";
import React from "react";
import { Link } from "react-router-dom";
import { PostModel } from "@data/models.ts";

interface PostBlockProps {
    data: PostModel;
}

export const PostBlock: React.FC<PostBlockProps> = ({ data }) => {
    const isExternal = data.isExternal && !!data.url;
    const linkLabel = `${data.title} — ${data.date}`;

    const content = (
        <>
            <h2 className={styles.blogListTitle}>{data.title}</h2>
            <div className={styles.blogListInfo}>
                <ul className={styles.tagList} aria-label="Tags">
                    {data.tags.map((tag) => (
                        <li className={styles.tag} key={tag}>{tag}</li>
                    ))}
                </ul>
                <p className={styles.blogListDate}>
                    <time dateTime={data.date}>{data.date}</time>
                </p>
            </div>
        </>
    );

    if (isExternal) {
        return (
            <a
                className={styles.blogListContainer}
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${linkLabel} (opens in a new tab)`}
            >
                {content}
            </a>
        );
    }

    return (
        <Link
            className={styles.blogListContainer}
            to={`/post/${data.id}`}
            aria-label={linkLabel}
        >
            {content}
        </Link>
    );
};