import SwitchInput from './SwitchInput';
import ImageInput from './ImageInput';
import './Profile.scss';

// XXX: mock
const mockData = [
    { name:"使用者名稱", type:"string", editable: true, value: "codingbear" },
    { name:"密碼", type:"password", editable: true, value: null },
    { name:"累積發文數", type:"number", editable: false, value: 276 },
    { name:"上線顯示", type:"boolean", editable: true, value: true },
    { name:"頭貼", type:"image", editable: true, value: "https://cdn.discordapp.com/attachments/763787703958372402/1209053537628323900/image.png?ex=65e585da&is=65d310da&hm=51f9cfce771d3b41cfb53286a3ad4ec9fbea74bdec59764830c82d14bd5bd3bf&" },
];

const ProfilePage = () => {
    // const updateProfile = () => {
    //     // TODO: update profile
    // };

    const mapInputType = (type) => {
        switch (type) {
            case 'string':
                return 'text';
            default:
                return type;
        }
    };

    const renderInput = (data) => {
        const { type } = data;
        switch (type) {
            case 'string':
            case 'password':
            case 'number':
                return renderCommonInput(data);
            case 'boolean':
                return renderSwitchInput(data);
            case 'image':
                return renderImageInput(data);
            default:
                return null;

        }

    };

    const rendetInputRow = (data) => {
        const { name } = data;
        return (
            <label key={name}>
                <span>{name}</span>
                {renderInput(data)}
            </label>
        );
    };

    const renderCommonInput = ({ name, type, editable, value }) => {
        const displayValue = type === 'password' ? '********' : value;
        const fixedType = mapInputType(type);
        const onChange = () => {
            // TODO: update value;
        };
        return (
            <input
                type={fixedType}
                name={name}
                readOnly={!editable}
                value={displayValue}
                onChange={onChange}
            />
        );
    };

    const renderSwitchInput = ({ editable, value }) => {
        const onClick = () => {
            if (editable) {
                // TODO: update value;
            }
        };

        return (
            <SwitchInput value={value} onClick={onClick} />
        );
    };

    const renderImageInput = ({ value, name, editable }) => {
        return (
            <ImageInput value={value} name={name} editable={editable} />
        );
    };

    return (
        <div className="profile-page">
            {mockData.map(rendetInputRow)}
        </div>
    );
};

export default ProfilePage;
