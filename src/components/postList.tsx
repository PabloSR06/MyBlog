// @ts-ignore
import styles from "@css/postList.module.css";
import {useEffect, useState} from "react";
import {getPost} from "@data/requests.ts";
import {PostModel} from "@data/models.ts";
import {PostBlock} from "@components/postBlock.tsx";

export default function PostList() {

    const [posts, setPosts] = useState<PostModel[]>([]);

    useEffect(() => {
        getPost().then(r => setPosts(r));
    }, []);


    return (
        <div className={styles.blogGrid}>
            {posts.map((post, index) => {

                return (
                    <PostBlock data={post} key={index}/>
                )
            })}
        </div>
    );
}