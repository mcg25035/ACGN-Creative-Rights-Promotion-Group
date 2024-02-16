import axios from "axios";
import UserAPI from "./UserAPI";
import UI from "./UI";

var sortBy = {
    "date-sb": "date-sb", // old to new
    "date-bs": "date-bs", // new to old
    "bp": "bp", // downvotes
    "gb": "gb", // upvotes
    "replies": "replies" 
}

var articleApiPath = "http://localhost:3000/api/articles"
var commentApiPath = (id) => `${articleApiPath}/${id}/comments`
var replyApiPath = (articleId, commentId) => `${commentApiPath(articleId)}/${commentId}/replies`


/**
 * @typedef {Object} article
 * @property {string} article.id
 * @property {string} article.title
 * @property {string} article.content
 * @property {string} article.thumbnail
 * @property {string} article.postBy
 * @property {Number} article.bp
 * @property {Number} article.gp
 * @property {Number} article.comments
 */
 
/**
 * @typedef {Object} comment
 * @property {string} comment.id
 * @property {string} comment.date
 * @property {string} comment.by
 * @property {string} comment.target
 * @property {string} comment.content
 * @property {Number} comment.bp
 * @property {Number} comment.gp
 * @property {Number} comment.replies
 * @property {Number} comment.state //0: none, 1 : deleted, 2 : edited
 */

class comment{
    /**
     * fetch 50 replies from the comment which id is {comment_id}
     * @param {string} article_id
     * @param {string} comment_id
     * @param {string} lastId
     * @param {("date-sb"|"date-bs"|"gp"|"bp"|"replies")} sortBy
     * @returns {Array<comment>}
     */
    static async fetchReplies(article_id, comment_id, sortBy, lastId){
        var res = await axios.get(`${replyApiPath(article_id, comment_id)}?sortBy=${sortBy}&lastId=${lastId}`)
        res = res.data
        return res.replies
    }

    /**
     * dislike the comment
     * @param {string} article_id
     * @param {string} comment_id
     */
    static async bp(article_id, comment_id){
        await axios.put(`${replyApiPath(article_id, comment_id)}/${comment_id}/bp?user=${UserAPI.currentUserId}`);
    }

    /**
     * like the comment
     * @param {string} article_id
     * @param {string} comment_id
     */
    static async gp(article_id, comment_id){
        await axios.put(`${replyApiPath(article_id, comment_id)}/${comment_id}/gp?user=${UserAPI.currentUserId}`);
    }

    /**
     * reply to the comment
     * @param {string} article_id
     * @param {string} comment_id
     * @param {string} content
     */
    static async postReply(article_id, comment_id, content){
        await axios.post(`${replyApiPath(article_id, comment_id)}?user=${UserAPI.currentUserId}`, {
            content: content
        });
    }

    /**
     * delete the comment
     * @param {string} article_id
     * @param {string} comment_id
     */
    static async delete(article_id, comment_id){
        await axios.delete(`${replyApiPath(article_id, comment_id)}/${comment_id}?user=${UserAPI.currentUserId}`);
    }

    /**
     * get the comment's self vote status
     * @param {string} comment_id
     * @returns {Number} 1 : like, 0 : none, -1 : dislike
     */
    static async getSelfState(comment_id){
        var res = await axios.get(`${articleApiPath}/bpgp/${comment_id}?user=${UserAPI.currentUserId}`)
        res = res.data
        return res.state
    }

}



/**
 * article class
 */
class article{

    /**
     * get article by id
     * @param {string} id
     * @returns {article}
     */
    static async getArticle(id){
        var res = await axios.get(`${articleApiPath}/${id}`)
        res = res.data
        return res
    }

    /**
     * get the article's self vote status
     * @param {string} id
     * @returns {Number} 1 : like, 0 : none, -1 : dislike
     */
    static async getSelfState(id){
        var res = await axios.get(`${articleApiPath}/bpgp/${id}?user=${UserAPI.currentUserId}`)
        res = res.data
        return res.state
    }

    /**
     * fetch 50 comments after the comment which id is {lastCommentId}
     * @param {string} id
     * @param {("date-sb"|"date-bs"|"gp"|"bp"|"replies")} sortBy
     * @param {string} lastCommentId
     * @returns {Array<comment>}
     */
    static async fetchComments(id, sortBy, lastCommentId){
        var res = await axios.get(`${commentApiPath(id)}?sortBy=${sortBy}&lastId=${lastCommentId}`)
        res = res.data
        return res.comments
    }

    /**
     * dislike the article
     * @param {string} id
     */
    static async bp(id){
        await axios.put(`${articleApiPath}/${id}/bp?user=${UserAPI.currentUserId}`)
    }

    /**
     * like the article
     * @param {string} id
     */
    static async gp(id){
        await axios.put(`${articleApiPath}/${id}/gp?user=${UserAPI.currentUserId}`)
    }

    /**
     * post a comment to an article
     * @param {string} id
     * @param {string} content
     */
    static async postComment(id, content){
        await axios.post(`${commentApiPath(id)}?user=${UserAPI.currentUserId}`, {
            content: content
        });
    }

    /**
     * delete the article
     * @param {string} id
     */
    static async delete(id){
        await axios.delete(`${articleApiPath}/${id}?user=${UserAPI.currentUserId}`)
    }
}

export default {
    article: article,
    comment: comment,
    sortBy: sortBy
};