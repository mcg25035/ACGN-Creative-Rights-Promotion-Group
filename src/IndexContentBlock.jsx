import "./IndexContentBlock.scss"
import React from "react"

/**
 * @param {String} content 
 */
function content_process(content){
    content = content.replaceAll(" ", "\u00A0")
    var lines_str = content.split("\n")
    var lines_element = []
    for (var i in lines_str){
        lines_element.push(
            <p key={i} className="index-content content-line">
                {lines_str[i]}
            </p>
        )
    }
    return lines_element
}



function IndexContentBlock({title, content, image_src}){
    return <div className="index-content-container">
        <div className="title-block">
            <p>{title}</p>
        </div>
        <div id="test" className="content-block">
            {content_process(content)}
        </div>
        <div className="image-block">
            <img src={image_src} />
        </div>
    </div>

    // return <div className="content-block">
    //     <div className="title-area">
    //         <p className="index-content title">
    //             {props.title}
    //         </p>
    //     </div>
    //     <div className="content-area">
    //         {contentProcess(props.content)}
    //     </div>
    // </div>

}

export default IndexContentBlock