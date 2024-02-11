import { useSelector } from "react-redux";
import IndexContentBlock from "./IndexContentBlock";
import "./IndexContentBlock.scss";

const IndexContentWrapper = () => {
    const articleList = useSelector((state) => state.articleList);
    const contentBlocks = articleList.map((item, index) => {
        const { title, content, imageSrc } = item;
        return <IndexContentBlock title={title} content={content} imageSrc={imageSrc} key={index} />;
    });
    return (
        <div className="index-content-wrapper">
            {contentBlocks}
        </div>
    );
};

export default IndexContentWrapper;
