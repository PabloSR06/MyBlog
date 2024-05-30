import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "@pages/HomePage.tsx";
import PostPage from "@pages/postPage.tsx";
import NotFoundPage from "@pages/not-found.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/:fileName" element={<PostPage/>}/>
            <Route path="404" element={<NotFoundPage/>}/>
            <Route path="*" element={<Home/>}/>
        </Routes>

    </BrowserRouter>,
)