import "./PostPage.scss"
import React, { useEffect } from "react"
import ThumbnailPreview from "../ThumbnailPreview"

const PostPage = () => {
    var refTextarea = React.createRef();

    useEffect(() => {
        var textarea = refTextarea.current
        if (!textarea) return;
        textarea.oninput = function() {
            textarea.style.height = ""; /* Reset the height*/
            textarea.style.height = Math.min(textarea.scrollHeight) + "px";
        };
    }, []);

    return (
        <div className="post-page">
            <div className="post-block-wrapper">
                <article className="article-conainer">
                    <h1 className="article-title">
                        <input className="title-area" placeholder="編輯title..."></input>
                    </h1>
                    <hr />
                    <ThumbnailPreview img_src="{thumbnail}"/>
                    <textarea ref={refTextarea} className="article-content" placeholder="編輯文章..."></textarea>
                </article>
            </div>
        </div>
    );
}

export default PostPage;