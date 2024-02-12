import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArticle } from './slices';
import './ArticlePage.scss';

// TODO: style

const ArticlePage = () => {
    const { articleId } = useParams();
    const { title, content } = useSelector((state) => state.article) || {};
    const dispatch = useDispatch();

    useEffect(() => {
        if (articleId) {
            dispatch(fetchArticle(articleId));
        }
    }, [dispatch, articleId]);

    return (
        <article className="article-page">
            <h1 className="article-title">{title}</h1>
            <p className="article-content">{content}</p>
        </article>

    );
};

export default ArticlePage;
