import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ArticleContainer from './ArticleContainer';
import CommentContainer from './CommentContainer';

import { fetchArticle, fetchComments, clearComment } from '../../features/actions';
import './ArticlePage.scss';
import LoadMore from './LoadMore';

const ArticlePage = () => {
    const { articleId } = useParams();
    const dispatch = useDispatch();
    const articleData = useSelector((state) => state.article);

    /**@type {Array} */
    const comments = useSelector((state) => state.comments);

    console.log(comments);

    useEffect(() => {
        if (articleId) {
            dispatch(clearComment());
            dispatch(fetchArticle(articleId));
            dispatch(fetchComments({articleId}));
        }
    }, [dispatch, articleId]);

    if (articleId !== articleData.id) {
        return null;
    }

    const commentList = comments.map((commentData) => <CommentContainer parentCommentCount={articleData.comments} level={0} articleId={articleId} commentData={commentData} key={commentData.id} />);

    return (
        <div className="article-page">
            <ArticleContainer articleData={articleData} />
            <div className="comment-list">
                {commentList}
                {articleData.comments - comments.length > 0 && <LoadMore articleId={articleId} level={0} parentId={articleId} commentList={comments} />}
            </div>
        </div>

    );
};

export default ArticlePage;
