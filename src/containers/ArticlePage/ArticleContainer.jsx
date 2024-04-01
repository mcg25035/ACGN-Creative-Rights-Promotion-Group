import PropTypes from 'prop-types';
import { toast, Bounce } from 'react-toastify';
import ReactionButtons from './ReactionButtons';
import { timestampFormat } from "../../utils/commonUtils";
import './ArticlePage.scss';
import ArticleHeader from '../ArticleHeader';
import ThumbnailShow from '../ThumbnailShow';
import { useEffect, useState } from 'react';
import { article, comment } from '../../utils/ArticleAPI';
import UserAPI from '../../utils/UserAPI';
import ReplyArea from './ReplyArea';

const ArticleContainer = ({ articleData }) => {
    const {
        id,
        title,
        content,
        post_by: postBy,
        date,
        thumbnail,
        bp,
        gp
    } = articleData;

    console.log(articleData);

    var [lock, setLock] = useState(true);
    var [bpState, setBpState] = useState(false);
    var [gpState, setGpState] = useState(false);
    var [bpCount, setBpCount] = useState(bp);
    var [gpCount, setGpCount] = useState(gp);
    const [replyEnabled, setReplyEnabled] = useState(false);

    var ratingData = { bpCount, gpCount, bpState, gpState };
    console.log(ratingData);

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
            await article.gp(id);
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
            await article.bp(id);
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
    };

    useEffect(()=>{
        (async ()=>{
            await UserAPI.waitUntilLoaded();
            if (!UserAPI.loginStatus) return;
            console.log("fetching state");
            var state = await article.getSelfState(id);
            console.log(state);
            if (state === 1) setGpState(true);
            if (state === -1) setBpState(true);
            setLock(false);
        })();
    }, [id]);

    return (
        <>
            <div className="article-block-wrapper">
                <ArticleHeader date={date} postBy={postBy}/>
                <article className="article-conainer">
                    <h1 className="article-title">{title}</h1>
                    <hr />
                    <ThumbnailShow img_src={thumbnail}/>
                    <p className="article-content">{content}</p>
                </article>
                <div className="button-container">
                    <ReactionButtons
                        articleInfo={articleData}
                        handleLike={handleLike}
                        handleDislike={handleDislike}
                        ratingData={ratingData}
                        handleReply={toggleReply}
                    />
                </div>
            </div>
            {replyEnabled && <ReplyArea parentId={id}/>}
        </>
    );
};

ArticleContainer.propTypes = {
    articleData: PropTypes.object.isRequired
};

export default ArticleContainer;
