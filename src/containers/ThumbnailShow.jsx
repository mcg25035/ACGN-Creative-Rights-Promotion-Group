import "./ThumbnailShow.scss"
import PropTypes from "prop-types";

const ArticleHeader = ({img_src}) => {
    return <div className="article-thumbnail">
        <img src={img_src}/>
    </div>
}

ArticleHeader.propTypes = {
    img_src: PropTypes.string.isRequired
}

export default ArticleHeader;

