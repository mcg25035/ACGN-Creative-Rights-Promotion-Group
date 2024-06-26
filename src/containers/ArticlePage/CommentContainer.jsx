import PropTypes from 'prop-types';
import './ArticlePage.scss';
import { useEffect, useState } from 'react';
import { article, comment } from '../../utils/ArticleAPI';
import ReactionButtons from './ReactionButtons';
import { toast, Bounce } from 'react-toastify';
import ReplyArea from './ReplyArea';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReplies } from '../../features/actions';
import { replyTagCheck } from '../../utils/commonUtils';
import UserAPI from '../../utils/UserAPI';
import LoadMore from './LoadMore';

const CommentContainer = ({ articleId, commentData, level, parentReply = null, parentCommentCount }) => {
    const {
        id,
        by,
        content,
        bp,
        gp,
        replieList,
    } = commentData;

    // console.log(parentCommentCount)

    var [lock, setLock] = useState(false);
    var [bpState, setBpState] = useState(false);
    var [gpState, setGpState] = useState(false);
    var [bpCount, setBpCount] = useState(bp);
    var [gpCount, setGpCount] = useState(gp);
    const [replyEnabled, setReplyEnabled] = useState(false);
    const dispatch = useDispatch();

    var ratingData = { bpCount, gpCount, bpState, gpState };

    const handleLike = async () => {
        // console.log(lock)
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
            await comment.gp(articleId, id);
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
            await comment.bp(articleId, id);
        }
        catch (e) {
            console.error(e);
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
        if (level == 1) {
            // console.log(parentReply)
            const [text, setText] = parentReply;
            if (replyTagCheck(text)) {
                var msg = text.split(" ");
                msg.shift();
                // console.log(msg)
                setText(msg.join(" "));
            }
            setText(`@${by} ${text}`);
            return;
        }
        setReplyEnabled(!replyEnabled);
        if (!replieList && !replyEnabled) {
            dispatch(fetchReplies({ articleId, commentId: id }));
        }
    };

    const style = {
        "--level": `${level}`
    };

    var replyState = useState('');
    const replieListEle = (replieList || []).map((commentData) => <CommentContainer parentCommentCount={commentData.replies} parentReply={replyState} level={level + 1} articleId={id} commentData={commentData} key={commentData.id} />);

    useEffect(()=>{
        (async ()=>{
            await UserAPI.waitUntilLoaded();
            if (!UserAPI.loginStatus) return;
            // console.log("fetching state");
            var state = await comment.getSelfState(id);
            // console.log(state);
            if (state === 1) setGpState(true);
            if (state === -1) setBpState(true);
            setLock(false);
        })();
    }, [id]);

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
                    <ReplyArea parentId={id} level={level+1} textState={replyState}/>
                    {replieListEle}
                </>
            )}
            {replyEnabled && (commentData.replies - replieListEle.length) > 0 && (
                <LoadMore level={level+1} parentId={id} commentList={(replieList || [])}/>
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
