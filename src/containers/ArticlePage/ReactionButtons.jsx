import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faReply } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import './ArticlePage.scss';

// TODO: fetch replies

const ReactionButtons = ({ articleInfo, handleLike, handleDislike, handleReply, ratingData }) => {
    const {
        state,
        replies,
        comments,
    } = articleInfo;

    console.log(ratingData);

    const {
        gpCount,
        bpCount,
        gpState,
        bpState
    } = ratingData;

    const className = classNames('reaction-row', { like: state === 1, dislike: state === -1 });
    const displayReplies = comments || replies;


    return (
        <>
            <div className={className}>
                <button type="button" className="btn" onClick={handleLike}>
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <span>{gpCount}</span>
                </button>
                <button type="button" className="btn" onClick={handleDislike}>
                    <FontAwesomeIcon icon={faThumbsDown} />
                    <span>{bpCount}</span>
                </button>
                <button type="button" className="btn" onClick={handleReply}>
                    <FontAwesomeIcon icon={faReply} />
                    <span>{displayReplies}</span>
                </button>
            </div>
        </>
    );
};

ReactionButtons.defaultProps = {
    handleReply: () => {},
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
    handleReply: PropTypes.func,
};

export default ReactionButtons;
