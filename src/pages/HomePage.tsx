import Portrait from "@components/portrait.tsx";
import PostList from "@components/postList.tsx";
import { Helmet } from "react-helmet-async";
import { Name } from "@data/constants.tsx";
import '../index.css';

export default function Home() {

    return (
        <>
            <Helmet>
                <title>{Name}</title>
                <meta name="description" content={`${Name} — personal blog about programming, technology and development.`} />
            </Helmet>

            <main>
                <section className="sectionBlock firstBlock" id="sec-1" aria-label="Introduction">
                    <div className="container">
                        <Portrait />
                        <a href="#blog" aria-label="Skip to blog posts">
                            <span className="scroll-down" aria-hidden="true"></span>
                        </a>
                    </div>
                </section>
                <section className="sectionBlock secondBlock" id="blog" aria-label="Blog">
                    <PostList />
                </section>
            </main>
        </>
    );
}

