import { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments } from '../../slices';
import './ReplyArea.scss';
import { article } from '../../utils/ArticleAPI';


const ReplyArea = ({ parentId }) => {
    const { loginStatus } = useSelector((state) => state.userState);
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const replyAreaWrapper = React.createRef();

    const updateText = (ev) => {
        const { value } = ev?.target || {};
        setText(value);
    };

    const sendComment = async () => {
        const payload = { parentId, text };

        article.postComment(payload.parentId, payload.text);

        dispatch(fetchComments(parentId));
    };

    if (!loginStatus) {
        return null;
    }

    const onFocus = () => {
        replyAreaWrapper.current.classList.add('focus');
    }

    const onBlur = () => {
        replyAreaWrapper.current.classList.remove('focus');
    }

    return (
        <div ref={replyAreaWrapper} className="reply-area">
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
    parentId: PropTypes.string.isRequired,
};

export default ReplyArea;
