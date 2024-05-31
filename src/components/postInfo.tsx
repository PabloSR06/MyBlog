import styles from "@css/postInfo.module.css";
import React, {useEffect, useState} from "react";
import {ItemModel} from "@data/models.ts";
import {getPostByName} from "@data/requests.ts";
import {Loader} from "@components/loader.tsx";
import "@css/markdown.css";
import Markdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "@css/github-dark-dimmed.css";
import {Helmet} from "react-helmet";


interface PostInfoProps {
    name: string
}
export const PostInfo:React.FC<PostInfoProps> = ({name}) => {

    const [post, setPost] = useState<ItemModel>({} as ItemModel);
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
    }else if (!post.postInfo) {
        window.location.href = '/404';
        //return <NotFoundPage/>;
    }else if(post.postInfo.isExternal){
        window.location.href = post.postInfo.url;
    }
    return (
        <div className={styles.post}>
            <Helmet>
                <title>{post.postInfo.title}</title>
                <meta name="description" content={post.postInfo.description} />
                <meta name="theme-color" content="#008f68" />
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