import classNames from 'classnames';
import PropTypes from 'prop-types';
import './SwitchInput.scss';

const SwitchInput = ({ value, onClick }) => {
    const className = classNames('switch-input', { enabled:  value  });

    return (
        <div className={className} onClick={onClick} />
    );
};

SwitchInput.propTypes = {
    value: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default SwitchInput;
