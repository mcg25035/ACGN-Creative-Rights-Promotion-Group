import "./IndexContentBlock.scss";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { timestampFormat } from "../../utils/commonUtils";
import ArticleHeader from "../ArticleHeader";
import ThumbnailShow from "../ThumbnailShow";

function IndexLoadMore({ articleData }){
    // const { date, id, title, thumbnail, post_by: postBy } = articleData;
    const refs = [new React.createRef(), new React.createRef(), new React.createRef()];
    const mouse = {
        over : () => {
            for (var i in refs){
                /**@type {HTMLElement} */
                var element = refs[i].current;
                element.classList.add("hover");
            }
        },
        out : () => {
            for (var i in refs){
                /**@type {HTMLElement} */
                var element = refs[i].current;
                element.classList.remove("hover");
            }
        }
    };
    return <div className="index-content-container" ref={refs[0]}>
        <ArticleHeader emptyHeader={true} />
        <div onMouseOver={mouse.over} onMouseOut={mouse.out}>
            <div ref={refs[1]} className="content-wrapper">
                <ThumbnailShow img_src="https://download.codingbear.mcloudtw.com/acgn/loadMore.png"/>
                <p ref={refs[2]} className="title-block">
                    {"點擊載入更多"}
                </p>
            </div>
        </div>
    </div>;
}

IndexLoadMore.propTypes = {
    articleData: PropTypes.object,
};

export default IndexLoadMore;
