import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faReply } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

import './ArticlePage.scss';

// TODO: fetch replies

const ReactionButtons = ({ articleInfo, handleLike, handleDislike, ratingData }) => {
    const {
        state,
        replies,
        comments,
        date,
    } = articleInfo;

    const {
        gpCount,
        bpCount,
        gpState,
        bpState
    } = ratingData;

    const className = classNames('reaction-row', { like: state === 1, dislike: state === -1 });
    const displayReplies = comments || replies;
    const displayDate = new Date(date).toLocaleDateString();

    return (
        <div className={className}>
            <button type="button" className="btn" onClick={handleLike}>
                <FontAwesomeIcon icon={faThumbsUp} />
                <span>{gpCount}</span>
            </button>
            <button type="button" className="btn" onClick={handleDislike}>
                <FontAwesomeIcon icon={faThumbsDown} />
                <span>{bpCount}</span>
            </button>
            <button type="button" className="btn">
                <FontAwesomeIcon icon={faReply} />
                <span>{displayReplies}</span>
            </button>
        </div>
    );
};

ReactionButtons.propTypes = {
    articleInfo: PropTypes.shape({
        state: PropTypes.number,
        replies: PropTypes.number,
        comments: PropTypes.number,
        date: PropTypes.number.isRequired,
        gp: PropTypes.number.isRequired,
        bp: PropTypes.number.isRequired,
    }).isRequired,
    handleLike: PropTypes.func.isRequired,
    handleDislike: PropTypes.func.isRequired,
};

export default ReactionButtons;
