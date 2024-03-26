import PropTypes from 'prop-types';
import ReactionButtons from './ReactionButtons';
import { timestampFormat, waitUntilLoaded } from "../../utils/commonUtils";
import './ArticlePage.scss';
import ArticleHeader from '../ArticleHeader';
import ThumbnailShow from '../ThumbnailShow';
import { useState } from 'react';
import {article, comment} from '../../utils/ArticleAPI';

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

    var [lock, setLock] = useState(true);
    var [bpState, setBpState] = useState(false);
    var [gpState, setGpState] = useState(false);
    var [bpCount, setBpCount] = useState(bp);
    var [gpCount, setGpCount] = useState(gp);

    const handleLike = async () => {
        console.log(lock)
        if (lock) return;
        setLock(true);
        if (bpState) await handleDislike();
        if (gpState) {
            setGpCount(gpCount - 1);
            setGpState(false);
            return setLock(false);
        }
        setGpCount(gpCount + 1);
        setGpState(true);
        await article.gp(id);
        setLock(false);
    };

    const handleDislike = async () => {
        console.log(lock)
        if (lock) return;
        setLock(true);
        if (gpState) await handleLike();
        if (bpState) {
            setBpCount(bpCount - 1);
            setBpState(false);
            return setLock(false);
        }
        setBpCount(bpCount + 1);
        setBpState(true);
        await article.bp(id);
        setLock(false);
    };

    (async ()=>{
        await waitUntilLoaded();
        console.log("fetching state")
        var state = await article.getSelfState(id)
        if (state === 1) setGpState(true);
        if (state === -1) setBpState(true);
        setLock(false);
    })()

    console.log({bpCount, gpCount, bpState, gpState})

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
                <ReactionButtons
                        articleInfo={articleData}
                        handleLike={handleLike}
                        handleDislike={handleDislike}
                        ratingData={{bpCount, gpCount, bpState, gpState}}
                />
            </div>
        </>
    );
};

ArticleContainer.propTypes = {
    articleData: PropTypes.object.isRequired
};

export default ArticleContainer;
