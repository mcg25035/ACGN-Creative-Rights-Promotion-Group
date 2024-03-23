import PropTypes from 'prop-types';
import ReactionButtons from './ReactionButtons';
import { timestampFormat } from "../../utils/commonUtils";
import './ArticlePage.scss';
import ArticleHeader from '../ArticleHeader';
import ThumbnailShow from '../ThumbnailShow';

const ArticleContainer = ({ articleData }) => {
    const {
        title,
        content,
        post_by: postBy,
        date,
        thumbnail
    } = articleData;

    const handleLike = () => {};
    const handleDislike = () => {};

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
                />
            </div>
        </>
    );
};

ArticleContainer.propTypes = {
    articleData: PropTypes.object.isRequired
};

export default ArticleContainer;
