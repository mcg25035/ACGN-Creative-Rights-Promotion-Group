import "./IndexContentBlock.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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
    const { id, title, thumbnail, post_by: postBy } = articleData;
    return <div className="index-content-container">
        <div className="index-content-header">
            <p className="date">2077.07.07</p>
            <p className="author">{postBy}</p>
        </div>
        <Link to={`/article/${id}`}>
            <div className="content-wrapper">
                <div className="image-block">
                    <img src={thumbnail}/>
                </div>
                <p className="title-block">
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
