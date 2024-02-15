import "./IndexContentBlock.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * @param {String} content
 */
function renderContentProcess(content){
    content = content.replaceAll(" ", "\u00A0");
    var linesStr = content.split("\n");
    var linesElement = [];
    for (var i in linesStr){
        var lineContent = linesStr[i];
        if (!lineContent){
            lineContent = "\u00A0";
        }
        linesElement.push(
            <p key={i} className="index-content content-line">
                {lineContent}
            </p>
        );
    }

    var textBlock = <div className="text-block">
        {linesElement}
    </div>;

    return textBlock;
}

function IndexContentBlock({ articleData }){
    const { id, title, content, thumbnail, post_by: postBy } = articleData;
    return <div className="index-content-container">
        <Link to={`/article/${id}`}>
            <div className="title-block">
                <p>{title}</p>
                <span>{`Author: ${postBy}`}</span>
            </div>
        </Link>
        <div className="content-wrapper">
            <div className="content-block">
                {renderContentProcess(content)}
            </div>
            <div className="image-block">
                <img src={thumbnail} title={title} />
            </div>
        </div>
    </div>;
}

IndexContentBlock.propTypes = {
    articleData: PropTypes.object.isRequired,
};

export default IndexContentBlock;
