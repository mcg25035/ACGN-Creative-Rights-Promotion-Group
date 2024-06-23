import React from "react";
import "./ThumbnailShow.scss"
import PropTypes from "prop-types";

const ThumbnailPreview = ({}) => {
    var hintRef = React.createRef();
    var imageRef = React.createRef();
    var defaultThumbnails = [
        "https://download.codingbear.mcloudtw.com/acgn/thumbnailDefault01.png",
        "https://download.codingbear.mcloudtw.com/acgn/thumbnailDefault02.png"
    ]
    var src = defaultThumbnails[Math.floor(Math.random()*2)];
    

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

    const clickEvent = () => {
        var src = prompt("請輸入圖片連結");
        if (!src) return;
        var element = imageRef.current;
        element.src = src;
    }


    return <div className="article-thumbnail preview" onClick={clickEvent} onMouseOver={mouseEvent.over} onMouseOut={mouseEvent.out}>
        <img ref={imageRef} src={src}/>
        <p ref={hintRef}>點擊以更換縮圖</p>
    </div>
}

ThumbnailPreview.propTypes = {
    img_src: PropTypes.string.isRequired
}

export default ThumbnailPreview;

