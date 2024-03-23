import "./ArticleHeader.scss";
import PropTypes from "prop-types";
import { timestampFormat } from "../utils/commonUtils";

const ArticleHeader = ({date, postBy}) => {
    return <div className="article-header">
        <p className="date">{timestampFormat(date)}</p>
        <p className="author">{postBy}</p>
    </div>
};

ArticleHeader.propTypes = {
    date: PropTypes.number.isRequired,
    postBy: PropTypes.string.isRequired
};

export default ArticleHeader;