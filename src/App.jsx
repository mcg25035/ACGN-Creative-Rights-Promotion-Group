import { Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import IndexPage from "./IndexPage";
import ArticlePage from "./ArticlePage";
import "./App.scss";

function App(){
    var divStyle={
        width: "100%",
    };

    return <div className="main-container" style={divStyle}>
        <Nav />
        <main>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/article/:articleId" element={<ArticlePage />} />
                <Route path="/about_us" element={<IndexPage />} />
                <Route path="/donate" element={<IndexPage />} />
                <Route path="/working_project" element={<IndexPage />} />
                <Route path="/join_us" element={<IndexPage />} />
            </Routes>
        </main>
        <Footer />
    </div>;
}

export default App;
