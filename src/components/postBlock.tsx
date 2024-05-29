// @ts-ignore
import styles from "@css/postList.module.css";
import React from "react";
import {PostModel} from "@data/models.ts";

interface PostBlockProps {
    data: PostModel;
}
export const PostBlock:React.FC<PostBlockProps> = ({ data }) => {


    const goPost = () => {
        window.location.href = `/${data.fileName}`;
    }
    return (
            <div className={styles.blogListContainer} onClick={goPost}>
                <h2 className={styles.blogListTitle}>{data.title}</h2>
                <div className={styles.blogListInfo}>
                    <div className={styles.tagList}>
                        {data.tags.map(tag => {
                            return <p className={styles.tag}>{tag}</p>;
                        })}
                    </div>
                    <p className={styles.blogListDate}>{data.date}</p>
                </div>
            </div>
    );
}