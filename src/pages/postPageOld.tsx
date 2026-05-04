import Header from "@components/header.tsx";
import { PostInfo } from "@components/postInfo.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ItemModel } from "@data/models.ts";
import { getPostByName } from "@data/requests.ts";
import { Loader } from "@components/loader.tsx";

export default function PostPageOld() {

    const { fileName } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState<ItemModel | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        if (!fileName) {
            navigate('/404', { replace: true });
            return;
        }

        setLoading(true);
        getPostByName(fileName)
            .then((data) => {
                if (cancelled) return;
                if (!data || !data.postInfo) {
                    navigate('/404', { replace: true });
                    return;
                }
                if (data.postInfo.isExternal && data.postInfo.url) {
                    window.location.replace(data.postInfo.url);
                    return;
                }
                setPost(data);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [fileName, navigate]);

    if (loading || !post) {
        return <Loader />;
    }

    return (
        <>
            <Header />
            <PostInfo post={post} />
        </>
    );
}

