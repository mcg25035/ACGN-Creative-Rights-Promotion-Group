import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import "./Loading.scss";

const Loading = () => {
    const loading = useSelector((state) =>
        Object.values(state).some(({ loading }) => loading)
    );

    if (!loading) {
        return null;
    }

    return (
        <div className="loading-overlay">
            <FontAwesomeIcon className="loading-icon" icon={faSpinner} />
        </div>
    );
};

export default Loading;
