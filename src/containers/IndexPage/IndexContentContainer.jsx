import { useSelector } from "react-redux";
import IndexContentBlock from "./IndexContentBlock";
import "./IndexContentBlock.scss";

const IndexContentWrapper = () => {
    const articleList = useSelector((state) => state.articleList);
    const contentBlocks = articleList.map((item) => {
        return <IndexContentBlock articleData={item} key={item.id}/>;
    });
    return (
        <div className="index-content-wrapper">
            {contentBlocks}
        </div>
    );
};

export default IndexContentWrapper;
