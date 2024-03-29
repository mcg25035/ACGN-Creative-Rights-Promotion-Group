import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments } from '../../slices';
import './ReplyArea.scss';

const ReplyArea = ({ parentId }) => {
    const { loginStatus } = useSelector((state) => state.userState);
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const updateText = (ev) => {
        const { value } = ev?.target || {};
        setText(value);
    };

    const sendComment = async () => {
        const payload = { parentId, text };

        // TODO: send comment

        dispatch(fetchComments(parentId));
    };

    if (!loginStatus) {
        return null;
    }

    return (
        <div className="reply-area">
            <textarea
                placeholder="回復訊息......"
                onChange={updateText}
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
