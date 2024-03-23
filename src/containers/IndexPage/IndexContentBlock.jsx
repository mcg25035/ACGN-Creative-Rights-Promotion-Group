import "./IndexContentBlock.scss";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { timestampFormat } from "../../utils/commonUtils";
import ArticleHeader from "../ArticleHeader";
import ThumbnailShow from "../ThumbnailShow";

/**
 * @param {String} content
 */
// function renderContentProcess(content){
//     content = content.replaceAll(" ", "\u00A0");
//     var linesStr = content.split("\n");
//     var linesElement = [];
//     for (var i in linesStr){
//         var lineContent = linesStr[i];
//         if (!lineContent){
//             lineContent = "\u00A0";
//         }
//         linesElement.push(
//             <p key={i} className="index-content content-line">
//                 {lineContent}
//             </p>
//         );
//     }
//
//     var textBlock = <div className="text-block">
//         {linesElement}
//     </div>;
//
//     return textBlock;
// }

function IndexContentBlock({ articleData }){
    const { date, id, title, thumbnail, post_by: postBy } = articleData;
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
        <ArticleHeader date={date} postBy={postBy}/>
        <Link to={`/article/${id}`} onMouseOver={mouse.over} onMouseOut={mouse.out}>
            <div ref={refs[1]} className="content-wrapper">
                <ThumbnailShow img_src={thumbnail}/>
                <p ref={refs[2]} className="title-block">
                    {title}
                </p>
            </div>
        </Link>
    </div>;
}

IndexContentBlock.propTypes = {
    articleData: PropTypes.object.isRequired,
};

export default IndexContentBlock;
