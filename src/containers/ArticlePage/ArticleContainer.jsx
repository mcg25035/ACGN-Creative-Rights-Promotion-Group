import PropTypes from 'prop-types';
import ReactionButtons from './ReactionButtons';

import './ArticlePage.scss';

const ArticleContainer = ({ articleData }) => {
    const {
        title,
        content,
        post_by: postBy
    } = articleData;

    const handleLike = () => {};
    const handleDislike = () => {};

    return (
        <>
            <article className="article-conainer">
                <h1 className="article-title">{title}</h1>
                <div>Author: <span className="author">{postBy}</span></div>
                <p className="article-content">{content}</p>
            </article>
            <ReactionButtons
                articleInfo={articleData}
                handleLike={handleLike}
                handleDislike={handleDislike}
            />
        </>
    );
};

ArticleContainer.propTypes = {
    articleData: PropTypes.object.isRequired
};

export default ArticleContainer;
