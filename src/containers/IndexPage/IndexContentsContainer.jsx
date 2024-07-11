import { useSelector } from "react-redux";
import IndexContentBlock from "./IndexContentBlock";
import "./IndexContentBlock.scss";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchArticleList, fetchArticleCount } from '../../features/actions';
import IndexLoadMore from "./IndexLoadMore";

const IndexContentWrapper = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchArticleList({}));
        dispatch(fetchArticleCount({}))
    }, [dispatch]);

    /**@type {Number} */
    const articleCount = useSelector((state) => state.articleCount);
    /**@type {Array} */
    const articleList = useSelector((state) => state.articleList);

    const contentBlocks = articleList.map((item) => {
        return <IndexContentBlock articleData={item} key={item.id}/>;
    });
    return (
        <div className="index-content-wrapper">
            {contentBlocks}
            {articleCount-articleList.length > 0 && <IndexLoadMore articleList={articleList}/>}
        </div>
    );
};

export default IndexContentWrapper;
