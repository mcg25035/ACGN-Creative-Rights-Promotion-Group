import { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments, fetchReplies } from '../../features/actions';
import { toast, Bounce } from 'react-toastify';
import './ReplyArea.scss';
import { article, comment } from '../../utils/ArticleAPI';


const ReplyArea = ({ level, parentId, textState = useState('') }) => {
    if (level > 1) {
        level = 1;
    }
    const { loginStatus } = useSelector((state) => state.userState);
    const [text, setText] = textState;
    const dispatch = useDispatch();
    const replyAreaWrapper = React.createRef();

    // console.log(text)

    const updateText = (ev) => {
        const { value } = ev?.target || {};
        setText(value);
    };

    const sendComment = async () => {
        const payload = { parentId, text };

        setText('');
        updateText({ target: { value: '' } });



        try {
            if (level == 0) {
                await article.postComment(payload.parentId, payload.text);
                dispatch(fetchComments(parentId));
            }
            else {
                await comment.postReply(payload.parentId, payload.parentId, payload.text);
                dispatch(fetchReplies({ parentId, commentId: parentId }));
            }
        }
        catch (e){
            console.error(e);
            toast.error('此事件交互失敗', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    };

    if (!loginStatus) {
        return null;
    }

    const onFocus = () => {
        replyAreaWrapper.current.classList.add('focus');
    };

    const onBlur = () => {
        replyAreaWrapper.current.classList.remove('focus');
    };

    var style = {
        "--level": level,
    };

    return (
        <div ref={replyAreaWrapper} style={style} className="reply-area">
            <textarea
                placeholder="新增回復..."
                onChange={updateText}
                onFocus={onFocus}
                onBlur={onBlur}
                value={text}
            />
            <button type="button" onClick={sendComment}>送出</button>
        </div>
    );
};

ReplyArea.propTypes = {
    level: PropTypes.number.isRequired,
    parentId: PropTypes.string.isRequired,
};

export default ReplyArea;
