import styles from "@css/postInfo.module.css";
import React from "react";
import {ItemModel} from "@data/models.ts";
import "@css/markdown.css";
import Markdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "@css/github-dark-dimmed.css";
import {Helmet} from "react-helmet";


interface PostInfoProps {
    post: ItemModel
}
export const PostInfo:React.FC<PostInfoProps> = ({post}) => {

    return (
        <div className={styles.post} role="article">
            <Helmet>
                <title>{post.postInfo.title}</title>
                <meta name="og:description" content={post.postInfo.description}/>
                <meta name="theme-color" content="#008f68"/>
                <meta name="og:url" content={`https://blog.pablosr.com/post/${post.postInfo.id}`}/>
                <meta property="og:type" content="article"/>
            </Helmet>
            <div className={styles.postInfo}>
                <h2 className={styles.postTitle}>{post.postInfo.title}</h2>
                <p className={styles.postDate}>{post.postInfo.date}</p>
            </div>
            <div>
                <div className={styles.postContent}>

                    <Markdown children={post.content} rehypePlugins={[rehypeRaw, rehypeHighlight]} remarkPlugins={[remarkGfm]}/>


                </div>
            </div>
            <div className={styles.postBottom}></div>
        </div>
    );
}