import "./Link.css"
import React from "react"

function Link(props){
   var text_ref = React.createRef();

   var on_click_redirect = ()=>{
      window.location.pathname = props.to
   }

   var div_hover = (isIn)=>{
      /**@type {HTMLElement} */
      var element = text_ref.current
      if (isIn) element.classList.add("onhover")
      else element.classList.remove("onhover")
   }

   return <div className="nav-link"
               onClick={on_click_redirect}
               onMouseOver={()=>{div_hover(true)}} onMouseOut={()=>{div_hover(false)}}>        
      <a ref={text_ref} className="nav-text">{props.name}</a> 
   </div>
   
}

export default Link;