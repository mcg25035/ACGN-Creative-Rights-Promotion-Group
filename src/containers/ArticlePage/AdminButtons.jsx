import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
import { article } from '../../utils/ArticleAPI';
import PropTypes from 'prop-types';
import { Bounce, toast } from 'react-toastify';


const AdminButtons = ({ articleId, deleteCallback }) => {

    var deleteArticle = async () => {
        try{
            await article.delete(articleId);
        }
        catch (e){
            console.error(e);
            return toast.error('此事件交互失敗', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
        deleteCallback();
    }


    return (
        <div className={'admin-row'}>
            <button type="button" className="btn" onClick={deleteArticle}>
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
            {/* <button type="button" className="btn" >
                <FontAwesomeIcon icon={faPen} />
            </button> */}
        </div>
    );
};


AdminButtons.propTypes = {
    articleId: PropTypes.number.isRequired,
    deleteCallback: PropTypes.func.isRequired
};


export default AdminButtons;