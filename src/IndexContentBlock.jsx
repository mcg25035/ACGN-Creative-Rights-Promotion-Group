import "./IndexContentBlock.scss";
import PropTypes from "prop-types";

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
    </div>

    return textBlock;
}

function IndexContentBlock({ title, content, imageSrc }){
    return <div className="index-content-container">
        <div className="title-block">
            <p>{title}</p>
        </div>
        <div className="content-wrapper">
            <div className="content-block">
                {renderContentProcess(content)}
            </div>
            <div className="image-block">
                <img src={imageSrc} title={title} />
            </div>
        </div>
    </div>;

    // return <div className="content-block">
    //     <div className="title-area">
    //         <p className="index-content title">
    //             {props.title}
    //         </p>
    //     </div>
    //     <div className="content-area">
    //         {contentProcess(props.content)}
    //     </div>
    // </div>

}

IndexContentBlock.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired
};

export default IndexContentBlock;
