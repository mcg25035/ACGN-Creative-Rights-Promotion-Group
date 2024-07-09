import "./ArticleHeader.scss";
import PropTypes from "prop-types";
import { timestampFormat } from "../utils/commonUtils";

const ArticleHeader = ({date=0, postBy="", emptyHeader}) => {
    return <div className="article-header">
        {!emptyHeader && <p className="date">{timestampFormat(date)}</p>}
        <p className="author">{postBy}</p>
    </div>
};

ArticleHeader.propTypes = {
    date: PropTypes.number,
    postBy: PropTypes.string,
    emptyHeader: PropTypes.bool
};

export default ArticleHeader;