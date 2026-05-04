import Header from "@components/header.tsx";
import { Suspense, lazy, useEffect, useState } from "react";
const PostInfo = lazy(() => import("@components/postInfo.tsx").then((m) => ({ default: m.PostInfo })));
import { useNavigate, useParams } from "react-router-dom";
import { ItemModel } from "@data/models.ts";
import { getPostById } from "@data/requests.ts";
import { Loader } from "@components/loader.tsx";

export default function PostPage() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState<ItemModel | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const numericId = Number(id);
        if (!id || !Number.isInteger(numericId) || numericId <= 0) {
            navigate('/404', { replace: true });
            return;
        }

        setLoading(true);
        getPostById(numericId)
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
    }, [id, navigate]);

    if (loading || !post) {
        return <Loader />;
    }

    return (
        <>
            <Header />
            <Suspense fallback={<Loader />}>
                <PostInfo post={post} />
            </Suspense>
        </>
    );
}

