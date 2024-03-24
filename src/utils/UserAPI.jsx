import axios from 'axios';
import sha256 from 'crypto-js/sha256';

var userApiPath = "http://localhost:3000/api/users";

String.prototype.reverse = function (){
    return this.split("").reverse().join("");
};

String.prototype.special = function (){
    var _0x0c = "";
    for (var _0x0d=0; _0x0d<2; _0x0d++){
        for (var _0x0e=_0x0d; _0x0e<this.length; _0x0e+=2){
            _0x0c += this[_0x0e];
        }
    }
    return _0x0c;
};

String.prototype.passwordProcess = function (){
    var salt = this + this.special() + this.special().reverse() + this.reverse();
    for (var i=0; i<3; i++) salt = salt+salt;
    var afterSalt = sha256(salt).toString();
    for (var i=0; i<16; i++) afterSalt = sha256(afterSalt+this).toString();
    return afterSalt;
};



class UserAPI{
    static currentUserId = "test_user_id";
    static currentUserName = "test_user_name";
    static currentUserNickname = "test_user_nickname";
    static currentUserAvatar = UserAPI.getAvatar(UserAPI.currentUserId);
    static loginStatus = false;


    /**
     * @param {string} id
     */
    static async getAvatar(id){
        const avatar = id ? `${id}.png` : '/public/user_avatar.png';
        return avatar;
    }

    /**
     * @param {string} userId
     * @param {string} name
     * @param {string} nickname
     */
    static async testLogin(userId, name, nickname){
        UserAPI.currentUserId = userId;
        UserAPI.currentUserName = name;
        UserAPI.currentUserNickname = nickname;
        UserAPI.currentUserAvatar = UserAPI.getAvatar(userId);
    }

    static async refreshLoad(){
        try{
            var response = await axios.get(`${userApiPath}/get_login_state`);
            UserAPI.currentUserId = response.data.user_id;
            UserAPI.currentUserName = response.data.realname;
            UserAPI.currentUserNickname = response.data.nickname;
            UserAPI.currentUserAvatar = UserAPI.getAvatar(UserAPI.currentUserId);
            UserAPI.loginStatus = true;
        }
        catch (e){}
    }

    /**
     * @param {string} userId
     * @param {string} password
     */
    static async login(userId, password){
        var password = password.passwordProcess();


        await axios.put(`${userApiPath}/${userId}/login`, {
            // eslint-disable-next-line camelcase
            user_id: userId,
            password: password
        });
        
    }

    /**
     * @param {string} userId
     * @param {string} password
     * @returns {string}
     */
    static async register(userId, password){
        var password = password.passwordProcess();
        var response = await axios.post(`${userApiPath}/${userId}/normal`, {
            password: password
        });
        return response.data.user_id;
    }

    /**
     * @param {string} verificationCode
     * @param {string} email
     */
    static async verifyEmail(verificationCode, email){
        await axios.put(`${userApiPath}/${UserAPI.currentUserId}/email_verify`, {
            verificationCode: verificationCode,
            email: email
        });
    }

    /**
     * @typedef {Object} ValueInfo
     * @property {String} name
     * @property {String} type
     * @property {Boolean} editable
     * @property {*} value
     */

    /**
     * @typedef {Object} UserConfig
     * @property {String} password
     * @property {String} email
     * @property {String} nickname
     * @property {String} realname
     * @property {String} avatar
     * @property {String} self_description_article
     *
     */

    /**
     * @param {string} userId
     */
    static async getUserInfo(userId){
        var response = await axios.get(`${userApiPath}/${userId}`);
        /**
         * @type {{[key: string]: ValueInfo}}
         */
        var info = {};

        info.userId = {
            name: "使用者ID",
            type: "string",
            editable: false,
            value: response.data.userId
        };

        info.password = {
            name: "密碼",
            type: "password",
            editable: true,
            value: null
        };

        info.email = {
            name: "電子郵件",
            type: "string",
            editable: true,
            value: response.data.email
        };

        info.permission = {
            name: "權限",
            type: "number",
            editable: false,
            value: response.data.permission
        };

        info.nickname = {
            name: "暱稱",
            type: "string",
            editable: true,
            value: response.data.nickname
        };

        info.realname = {
            name: "真實姓名",
            type: "string",
            editable: true,
            value: response.data.realname
        };

        info.isMember = {
            name: "是否為會員",
            type: "boolean",
            editable: false,
            value: response.data.is_member
        };

        info.idVerifyData = {
            name: "身分證資料",
            type: "IDVerifyData",
            editable: false,
            value: response.data.id_verify_data
        };

        info.avatar = {
            name: "頭像",
            type: "image",
            editable: true,
            value: response.data.avatar
        };

        info.selfDescriptionArticle = {
            name: "自我描述文章",
            type: "string",
            editable: true,
            value: response.data.self_description_article
        };

        for (var i in info) {
            if (!info[i].value) return;
        }

        return info;
    }

    /**
     * @param {String} userId
     * @param {UserConfig} config
     */
    static async updateUserInfo(userId, config) {
        await axios.put(`${userApiPath}/${userId}`, config);
    }



}

export default UserAPI;
