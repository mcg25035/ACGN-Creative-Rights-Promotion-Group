import "./PostPage.scss"
import React, { useEffect } from "react"
import ThumbnailPreview from "../ThumbnailPreview"
import { useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";
import { article } from "../../utils/ArticleAPI";
import TransitionTriangle from "../../transitions/TransitionTriangle";

const PostPage = () => {
    var refArticleEdit = React.createRef();
    var refTitleEdit = React.createRef();
    var [articleContent, setArticleContent] = React.useState("");
    var [articleTitle, setArticleTitle] = React.useState("");
    var [thumbnail, setThumbnail] = React.useState("");
    var [postSuccess, setPostSuccess] = React.useState(false);
    const { loginStatus } = useSelector((state) => state.userState);

    useEffect(() => {
        /**@type {HTMLTextAreaElement} */
        var articleEditTextArea = refArticleEdit.current
        /**@type {HTMLInputElement} */
        var titleEditInput = refTitleEdit.current

        if (!articleEditTextArea) return;
        if (!titleEditInput) return;

        var defaultThumbnails = [
            "https://download.codingbear.mcloudtw.com/acgn/thumbnailDefault01.png",
            "https://download.codingbear.mcloudtw.com/acgn/thumbnailDefault02.png"
        ]
        setThumbnail(defaultThumbnails[Math.floor(Math.random()*2)])

        articleEditTextArea.oninput = function() {
            setArticleContent(articleEditTextArea.value);
            articleEditTextArea.style.height = ""; /* Reset the height*/
            articleEditTextArea.style.height = Math.min(articleEditTextArea.scrollHeight) + "px";
        }

        titleEditInput.oninput = function() {
            setArticleTitle(titleEditInput.value);
        }

    }, []);

    // // for debug
    // useEffect(() => {
    //     console.log(articleTitle, articleContent)
    // }, [articleTitle, articleContent])

    var post = async () => {
        try{
            await article.postArticle(articleTitle, articleContent, thumbnail);
            setPostSuccess(true);
        }
        catch(error) {
            console.error(error);
            return toast.error('此事件交互失敗', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }

        
    }

    return (
        <div className="post-page">
            <div className="post-block-wrapper">
                <TransitionTriangle active={postSuccess} text="發文成功" redirectTo='/' />
                <article className="article-conainer">
                    <h1 className="article-title">
                        <input ref={refTitleEdit} className="title-area" placeholder="編輯標題..."></input>
                    </h1>
                    <hr />
                    <ThumbnailPreview imgSrc={thumbnail} setImgSrc={setThumbnail}/>
                    <textarea ref={refArticleEdit} className="article-content" placeholder="編輯文章..."></textarea>
                </article>
                <div className="button-container">
                    <button className="post" onClick={post}>發文</button>
                </div>
            </div>
        </div>
    );
}

export default PostPage;