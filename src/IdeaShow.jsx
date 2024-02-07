import bg from '/bg1.jpg'
import char from '/char1.png'
import './IdeaShow.scss'

function IdeaShow(){
    return <div className='container-ideashow'>
        <img className='bg' src={bg}></img>
        <img className='char' src={char}></img>
        <div className='text-container'>
            <p className='slogan'>拒絕網路戒嚴</p>
            <p className='slogan'>&emsp;&emsp;我們不要第二個白色恐怖</p>
        </div>
    </div>

}

export default IdeaShow