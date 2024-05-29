import Portrait from "@components/portrait.tsx";
import PostList from "@components/postList.tsx";
import '../index.css'

export default  function Home() {

    return (
        <>


            <div className="sectionBlock firstBlock" id="sec-1">
                <div className="container">

                    <Portrait/>


                    <a href="#blog" aria-label="go to blog">
                        <div className="scroll-down"></div>
                    </a>
                </div>
            </div>
            <div className="sectionBlock secondBlock" id="blog">
                <div className="">


                    <PostList/>


                </div>
            </div>
        </>
    );

}

