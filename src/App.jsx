import { Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./containers/Footer";
import IndexPage from "./containers/IndexPage";
import ArticlePage from "./containers/ArticlePage";
import ProfilePage from "./containers/ProfilePage";
import Login from "./acount/login";
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
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </main>
        <Footer />
    </div>;
}

export default App;
