import PropTypes from 'prop-types';
import './ArticlePage.scss';
import { useState } from 'react';
import { article, comment } from '../../utils/ArticleAPI';
import ReactionButtons from './ReactionButtons';
import { toast, Bounce } from 'react-toastify';
import ReplyArea from './ReplyArea';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReplies } from '../../slices';

const CommentContainer = ({ articleId, commentData, level }) => {
    const {
        id,
        by,
        content,
        bp,
        gp,
        replieList,
    } = commentData;

    var [lock, setLock] = useState(true);
    var [bpState, setBpState] = useState(false);
    var [gpState, setGpState] = useState(false);
    var [bpCount, setBpCount] = useState(bp);
    var [gpCount, setGpCount] = useState(gp);
    const [replyEnabled, setReplyEnabled] = useState(false);
    const dispatch = useDispatch();

    var ratingData = { bpCount, gpCount, bpState, gpState };

    const handleLike = async () => {
        if (lock) return toast.error('此事件交互失敗', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        setLock(true);
        try {
            await comment.gp(articleId, gp);
        }
        catch (e) {
            setLock(false);
            return toast.error('此事件交互失敗', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
        if (bpState) {
            setBpState(false);
            setBpCount(bpCount - 1);
        }
        if (gpState) {
            setGpCount(gpCount - 1);
            setGpState(false);
            return setLock(false);
        }
        setGpCount(gpCount + 1);
        setGpState(true);
        setLock(false);
    };

    const handleDislike = async () => {
        if (lock) return toast.error('此事件交互失敗', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        setLock(true);
        try {
            await comment.bp(articleId, bp);
        }
        catch (e) {
            setLock(false);
            return toast.error('此事件交互失敗', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
        if (gpState) {
            setGpState(false);
            setGpCount(gpCount - 1);
        }
        if (bpState) {
            setBpCount(bpCount - 1);
            setBpState(false);
            return setLock(false);
        }
        setBpCount(bpCount + 1);
        setBpState(true);
        setLock(false);
    };

    const toggleReply = () => {
        setReplyEnabled(!replyEnabled);
        if (!replieList && !replyEnabled) {
            dispatch(fetchReplies({ articleId, commentId: id }));
        }
    };

    const style = {
        "--level": `${level}`
    };


    const replieListEle = (replieList || []).map((commentData) => <CommentContainer level={level + 1} articleId={id} commentData={commentData} key={commentData.id} />);

    return (
        <>
            <div className="comment-container" style={style}>
                <div className="comment-content">
                    <p className="author">{by}</p>
                    <p>{content}</p>
                </div>
                <ReactionButtons
                    articleInfo={commentData}
                    handleLike={handleLike}
                    handleDislike={handleDislike}
                    ratingData={ratingData}
                    handleReply={toggleReply}
                />
            </div>
            {replyEnabled && (
                <>
                    <ReplyArea parentId={id} level={level+1}/>
                    {replieListEle}
                </>
            )}
        </>
    );
};

CommentContainer.propTypes = {
    level: PropTypes.number.isRequired,
    commentData: PropTypes.object.isRequired,
    articleId: PropTypes.string.isRequired
};

export default CommentContainer;
