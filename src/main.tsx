import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "@pages/HomePage.tsx";
import PostPageOld from "@pages/postPageOld.tsx";
import NotFoundPage from "@pages/not-found.tsx";
import PostPage from "@pages/postPage.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/:fileName" element={<PostPageOld/>}/>
            <Route path="/post/:id" element={<PostPage/>}/>
            <Route path="404" element={<NotFoundPage/>}/>
            <Route path="*" element={<Home/>}/>
        </Routes>

    </BrowserRouter>,
)