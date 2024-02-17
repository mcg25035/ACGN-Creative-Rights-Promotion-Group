import PropTypes from 'prop-types';
import './ArticlePage.scss';
import ReactionButtons from './ReactionButtons';

const CommentContainer = ({ commentData }) => {
    const {
        by,
        content,
    } = commentData;

    const handleLike = () => {};
    const handleDislike = () => {};

    return (
        <div className="comment-container">
            <div className="comment-content">
                <span className="author">{by}: </span>
                <span>{content}</span>
            </div>
            <ReactionButtons
                articleInfo={commentData}
                handleLike={handleLike}
                handleDislike={handleDislike}
            />
        </div>
    );
};

CommentContainer.propTypes = {
    commentData: PropTypes.object.isRequired,
};

export default CommentContainer;
