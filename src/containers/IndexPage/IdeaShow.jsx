import bg from '/bg1.jpg';
import char from '/char1.png';
import './IdeaShow.scss';

function IdeaShow(){
    return <div className='container-ideashow'>
        <img className='bg' src={bg}></img>
        <img className='char' src={char}></img>
        <div className='text-container'>
            <p className='slogan'>&nbsp;測試標語第一行</p>
            <p className='slogan'>&nbsp;&emsp;&emsp;測試標語第二行&nbsp;&nbsp;</p>
        </div>
    </div>;

}

export default IdeaShow;
