import "./ThumbnailShow.scss"
import PropTypes from "prop-types";

const ThumbnailShow = ({img_src}) => {
    return <div className="article-thumbnail">
        <img src={img_src}/>
    </div>
}

ThumbnailShow.propTypes = {
    img_src: PropTypes.string.isRequired
}


export default ThumbnailShow;

