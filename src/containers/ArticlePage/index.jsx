import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

import { fetchArticle, fetchComments } from '@/slices';
import './ArticlePage.scss';

// TODO: style
// TODO: split components
// TODO: comments

const ArticlePage = () => {
    const { articleId } = useParams();
    const dispatch = useDispatch();
    const {
        id,
        gp,
        bp,
        title,
        content,
        post_by: postBy
    } = useSelector((state) => state.article);

    const comments = useSelector((state) => state.comments);

    useEffect(() => {
        if (articleId) {
            dispatch(fetchArticle(articleId));
            dispatch(fetchComments(articleId));
        }
    }, [dispatch, articleId]);

    if (articleId !== id) {
        return null;
    }

    return (
        <div className="article-page">
            <article>
                <h1 className="article-title">{title}</h1>
                <div>{`Author: ${postBy}`}</div>
                <p className="article-content">{content}</p>
            </article>
            <hr />
            <section className="article-comments">
                <div className="reaction-btns">
                    <button className="gp-btn">
                        <FontAwesomeIcon icon={faThumbsUp} />
                        <span>{gp}</span>
                    </button>
                    <button className="bp-btn">
                        <FontAwesomeIcon icon={faThumbsDown} />
                        <span>{bp}</span>
                    </button>
                </div>
            </section>
        </div>

    );
};

export default ArticlePage;
