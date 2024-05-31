import Header from "@components/header.tsx";
import {PostInfo} from "@components/postInfo.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ItemModel} from "@data/models.ts";
import {getPostByName} from "@data/requests.ts";
import {Loader} from "@components/loader.tsx";

export default  function PostPageOld() {

    const { fileName } = useParams();

    const [post, setPost] = useState<ItemModel>({} as ItemModel);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await getPostByName(fileName || "");

            if(data === undefined){
                window.location.href = '/404';
            }else{
                setPost(data);
            }
        }

        fetchData().then(() => setLoading(false));
    }, [fileName]);

    if(loading){
        return <Loader/>
    }else if (!post.postInfo) {
        window.location.href = '/404';
        //return <NotFoundPage/>;
    }else if(post.postInfo.isExternal){
        window.location.href = post.postInfo.url;
    }

    return (
        <>
            <Header/>
            <PostInfo post={post}/>

        </>
    );

}

