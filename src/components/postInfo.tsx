import styles from "@css/postInfo.module.css";
import React from "react";
import { ItemModel } from "@data/models.ts";
import "@css/markdown.css";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "@css/github-dark-dimmed.css";
import { Helmet } from "react-helmet-async";
import { Name } from "@data/texts.ts";

interface PostInfoProps {
    post: ItemModel;
}

export const PostInfo: React.FC<PostInfoProps> = ({ post }) => {
    if (!post?.postInfo) return null;

    const { postInfo, content } = post;
    const tags = Array.isArray(postInfo.tags) ? postInfo.tags : [];

    return (
        <article className={styles.post}>
            <Helmet>
                <title>{`${postInfo.title} — ${Name}`}</title>
                <meta name="description" content={postInfo.description} />
                <meta property="og:title" content={postInfo.title} />
                <meta property="og:description" content={postInfo.description} />
                <meta name="theme-color" content="#008f68" />
                <meta property="og:url" content={`https://blog.pablosr.com/post/${postInfo.id}`} />
                <meta property="og:type" content="article" />
                {tags.length > 0 && <meta name="keywords" content={tags.join(", ")} />}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${postInfo.title} — ${Name}`} />
                <meta name="twitter:description" content={postInfo.description} />
            </Helmet>
            <header className={styles.postInfo}>
                <h1 className={styles.postTitle}>{postInfo.title}</h1>
                <p className={styles.postDate}>
                    <time dateTime={postInfo.date}>{postInfo.date}</time>
                </p>
            </header>
            <div className={styles.postContent}>
                <Markdown
                    rehypePlugins={[rehypeRaw, rehypeHighlight]}
                    remarkPlugins={[remarkGfm]}
                >
                    {content}
                </Markdown>
            </div>
            <div className={styles.postBottom} />
        </article>
    );
};