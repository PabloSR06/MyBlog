// @ts-ignore
import styles from "@css/postInfo.module.css";
import React, {useEffect, useState} from "react";
import {PostModel} from "@data/models.ts";
import {getPostByName} from "@data/requests.ts";
import {Loader} from "@components/loader.tsx";

interface PostInfoProps {
    name: string
}
export const PostInfo:React.FC<PostInfoProps> = ({name}) => {

    const [post, setPost] = useState<PostModel>({} as PostModel);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await getPostByName(name);

            if(data === undefined){
                window.location.href = '/404';
            }else{
                setPost(data);
            }
        }

        fetchData().then(() => setLoading(false));
    }, [name]);

    if(loading){
        return <Loader/>
    }else if (!post) {
        window.location.href = '/404';
        //return <NotFoundPage/>;
    }
    return (
        <div className={styles.post}>
            <div className={styles.postInfo}>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postDate}>{post.date}</p>
            </div>
            <div>
                <div className={styles.postContent}>
                    {post.description}
                </div>
            </div>
            <div className={styles.postBottom}></div>
        </div>
    );
}