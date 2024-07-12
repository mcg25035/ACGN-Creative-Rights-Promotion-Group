import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import Nav from "./Nav";
import Footer from "./containers/Footer";
import IndexPage from "./containers/IndexPage";
import ArticlePage from "./containers/ArticlePage";
import ProfilePage from "./containers/ProfilePage";
import Login from "./containers/AccountPortal/login";
import SignUP from "./containers/AccountPortal/signup";
import Forget from "./containers/AccountPortal/forget";
import EmailVerifyPage from "./containers/EmailVerifyPage";
import Loading from "./containers/Loading";
import PostPage from "./containers/PostPage";
import { fetchUserState } from './features/actions';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import 'sweetalert2/src/sweetalert2.scss';
import "./App.scss";
import TestComponent from "./containers/TestComponent";
import Logout from "./containers/Logout";


function App(){
    var divStyle={
        width: "100%",
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserState());
    }, [dispatch]);

    return <div className="main-container" style={divStyle}>
        <ToastContainer />
        <Nav />
        <main>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/article/:articleId" element={<ArticlePage />} />
                <Route path="/about_us" element={<IndexPage />} />
                <Route path="/donate" element={<IndexPage />} />
                <Route path="/working_project" element={<IndexPage />} />
                <Route path="/join_us" element={<IndexPage />} />
                <Route path="/post_article" element={<PostPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/signup" element={<SignUP/>}/>
                <Route path="/forget" element={<Forget/>}/>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/emailVerifyPage" element={<EmailVerifyPage />} />
                {/* <Route path="/test" element={< TestComponent/>} /> */}
            </Routes>
        </main>
        <Footer />
        <Loading />
    </div>;
}

export default App;
