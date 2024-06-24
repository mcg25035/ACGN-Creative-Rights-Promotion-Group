import React from "react";
import "./ThumbnailShow.scss"
import Swal from 'sweetalert2';
import PropTypes from "prop-types";
import withReactContent from 'sweetalert2-react-content';
import "./SweatAlertCustom.scss";

const MySwal = withReactContent(Swal);

/**
 * @typedef ThumbnailPreviewProps
 * @type {Object}
 * @property {String} imgSrc
 * @property {Function<String>} setImgSrc
 */

/**
 * @param {ThumbnailPreviewProps} param0 
 */
const ThumbnailPreview = ({imgSrc, setImgSrc}) => {
    var hintRef = React.createRef();
    var imageRef = React.createRef();
    

    const mouseEvent = {
        over : () => {
            /**@type {HTMLElement} */
            var element = hintRef.current;
            element.classList.add("active");
        },
        out : () => {
            /**@type {HTMLElement} */
            var element = hintRef.current;
            element.classList.remove("active");
        }
    }

    const clickEvent = async () => {
        try {
            const { value: src } = await MySwal.fire({
                title: '請輸入圖片網址',
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: '確認',
                showLoaderOnConfirm: true,
                /**
                 * @param {String} src 
                 * @returns 
                 */
                preConfirm: async (src) => {
                    // MySwal.showLoading(MySwal.getCancelButton());
                    MySwal.getCancelButton().style.display = 'none';
                    try {
                        if (src.slice(0, 8) !== "https://" && src.slice(0, 7) !== "http://") {
                            src = "https://" + src;
                        }
                        const response = await fetch(src);
                        if (!response.ok) {
                            throw response.statusText;
                        }
                        if (!response.headers.get('Content-Type').includes('image')) {
                            throw '目標連結不是圖片';
                        }
                        return src;
                    } catch (error) {
                        Swal.showValidationMessage(
                            `連結無效： ${error}`
                        );
                    }
                    MySwal.getCancelButton().style.display = '';
                },
                allowOutsideClick: () => !Swal.isLoading(),
                customClass: {
                    popup: 'custom-swal-popup',
                    input: 'custom-swal-input',
                    title: 'custom-swal-title',
                    validationMessage: 'custom-swal-validation-message',
                    actions: 'custom-swal-actions',
                    confirmButton: 'custom-swal-confirm-button',
                    cancelButton: 'custom-swal-cancel-button'
                }
            });

            if (!src) return;
            setImgSrc(src);
        } catch (error) {
            console.error("Error:", error);
        }
    }


    return <div className="article-thumbnail preview" onClick={clickEvent} onMouseOver={mouseEvent.over} onMouseOut={mouseEvent.out}>
        <img ref={imageRef} src={imgSrc}/>
        <p ref={hintRef}>點擊以更換縮圖</p>
    </div>
}

ThumbnailPreview.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    setImgSrc: PropTypes.func.isRequired
}

export default ThumbnailPreview;

