import logo from '/logo.png'

function Icon(){
    var style = {
        height: "100%",
        width: "auto",
        cursor: "pointer"
    }

    var on_icon_click = ()=>{
        window.location.pathname = "/"
    }


    return <img onClick={on_icon_click} style={style} className='nav-icon' src={logo} />
}

export default Icon;
