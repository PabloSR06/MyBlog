import styles from "@css/postList.module.css";
import { useEffect, useState } from "react";
import { getPost } from "@data/requests.ts";
import { PostModel } from "@data/models.ts";
import { PostBlock } from "@components/postBlock.tsx";

export default function PostList() {

    const [posts, setPosts] = useState<PostModel[]>([]);

    useEffect(() => {
        let cancelled = false;
        getPost().then((data) => {
            if (cancelled) return;
            const sorted = [...data].sort((a, b) => b.id - a.id);
            setPosts(sorted);
        });
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <section className={styles.blogGrid} aria-label="Blog posts">
            {posts.map((post) => (
                <PostBlock data={post} key={post.id} />
            ))}
        </section>
    );
}