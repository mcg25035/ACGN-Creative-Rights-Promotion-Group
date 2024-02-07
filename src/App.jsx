import IdeaShow from "./IdeaShow";
import Nav from "./Nav";
import IndexContentContainer from "./IndexContentContainer";
import "./App.scss";

function App(){
    var divStyle={
        width: "100%",
    };

    return <div className="main-container" style={divStyle}>
        <IdeaShow />
        <Nav />
        <IndexContentContainer />

    </div>;
}

export default App;
