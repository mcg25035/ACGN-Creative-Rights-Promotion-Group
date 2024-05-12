import { useDispatch } from "react-redux";
import { fetchReplies } from "../../slices";


const LoadMore = ({articleId = 0, level, parentId, commentList})=>{
    var dispatch = useDispatch();

    var style = {
        "--level": level,
    };

    var loadMoreHandler = ()=>{
        dispatch(fetchReplies({ articleId, commentId: parentId, lastId: commentList[commentList.length - 1].id}));
    }
    
    return (
        <div style={style} className="reply-area">
            <label>
                <p>載入更多</p>
                <button onClick={loadMoreHandler}></button>
            </label>
        </div>
    );
}

export default LoadMore;