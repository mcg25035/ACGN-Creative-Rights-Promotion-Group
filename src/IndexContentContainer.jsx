import "./IndexContentBlock.scss";
import IndexContentBlock from "./IndexContentBlock";

// XXX: test data
const mockData = [
    {
        title: "標題 1",
        content: "內容\n內容第二行\n    空白測試",
        imageSrc: "/test.png"
    }, {
        title: "標題 2",
        content: "內容\n內容第二行\n    空白測試",
        imageSrc: "/test.png"
    }, {
        title: "標題 2",
        content: "內容\n內容第二行\n    空白測試",
        imageSrc: "/test.png"
    }
];

const IndexContentWrapper = () => {
    const contentBlocks = mockData.map((item, index) => {
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
