import IdeaShow from "./IdeaShow";
import Nav from "./Nav";
import IndexContentBlock from "./IndexContentBlock";
import "./App.scss";

function App(){
    var divStyle={
        width: "100%",
    };

    return <div className="main-container" style={divStyle}>
        <IdeaShow />
        <Nav />
        <IndexContentBlock title="標題" content={"內容\n內容第二行\n    空白測試"} image_src={"/test.png"} />

    </div>;
}

export default App;
