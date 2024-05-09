import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ArticleContainer from './ArticleContainer';
import CommentContainer from './CommentContainer';

import { fetchArticle, fetchComments } from '../../slices';
import './ArticlePage.scss';

const ArticlePage = () => {
    const { articleId } = useParams();
    const dispatch = useDispatch();
    const articleData = useSelector((state) => state.article);
    const comments = useSelector((state) => state.comments);

    console.log(comments);

    useEffect(() => {
        if (articleId) {
            dispatch(fetchArticle(articleId));
            dispatch(fetchComments(articleId));
        }
    }, [dispatch, articleId]);

    if (articleId !== articleData.id) {
        return null;
    }

    const commentList = comments.map((commentData) => <CommentContainer level={0} articleId={articleId} commentData={commentData} key={commentData.id} />);

    return (
        <div className="article-page">
            <ArticleContainer articleData={articleData} />
            <div className="comment-list">
                {commentList}
            </div>
        </div>

    );
};

export default ArticlePage;
