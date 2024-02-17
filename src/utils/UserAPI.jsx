class UserAPI{
    static currentUserId = "test_user_id";
    static currentUserName = "test_user_name";
    static currentUserNickname = "test_user_nickname";
    static currentUserAvatar = UserAPI.getAvatar(UserAPI.currentUserId);


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

}

export default UserAPI;
