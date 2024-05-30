import Header from "@components/header.tsx";
import {PostInfo} from "@components/postInfo.tsx";
import {useParams} from "react-router-dom";

export default  function PostPage() {

    const { fileName } = useParams();


    return (
        <>
            <Header/>
            <PostInfo name={fileName || ""}/>

        </>
    );

}

