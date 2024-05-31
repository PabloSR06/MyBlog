import styles from "@css/postList.module.css";
import React from "react";
import {PostModel} from "@data/models.ts";

interface PostBlockProps {
    data: PostModel;
}
export const PostBlock:React.FC<PostBlockProps> = ({ data }) => {


    const goPost = () => {
        window.location.href = `/post/${data.id}`;
    }
    return (
            <div className={styles.blogListContainer} onClick={goPost} tabIndex={0} >
                <h2 className={styles.blogListTitle}>{data.title}</h2>
                <div className={styles.blogListInfo}>
                    <div className={styles.tagList}>
                        {data.tags.map((tag,index) => {
                            return <p className={styles.tag} key={index}>{tag} </p>;
                        })}
                    </div>
                    <p className={styles.blogListDate}>{data.date}</p>
                </div>
            </div>
    );
}