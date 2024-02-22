import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import './ImageInput.scss';

const ImageInput = ({ value }) => {

    const [tmpImage, setTmpImage ]= useState('');

    const changeImage = async (ev) => {
        const { files } = ev?.target || {};
        const dataUrl = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
        setTmpImage(dataUrl);
    };

    const displayImg = tmpImage ? tmpImage : value;

    return (
        <div className="image-input">
            <div className="image-wrapper">
                <img src={displayImg} />
                <div className="camera-tip">
                    <FontAwesomeIcon icon={faCamera} />
                </div>
            </div>
            <input type="file" onChange={changeImage} />
        </div>
    );
};

ImageInput.propTypes = {
    value: PropTypes.string.isRequired,
};

export default ImageInput;
