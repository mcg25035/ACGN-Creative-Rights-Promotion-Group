import axios from "axios";
import UserAPI from "./UserAPI";
// import UI from "./UI";

export const SORT_BY = {
    DATE_SB: "date-sb", // old to new
    DATE_BS: "date-bs", // new to old
    GP: "bp", // downvotes
    BP: "gb", // upvotes
    REPLIES: "replies"
};

var articleApiPath = "http://localhost:3000/api/articles";
var commentApiPath = (id) => `${articleApiPath}/${id}/comments`;
var repliesApiPath = (articleId, commentId) => `${commentApiPath(articleId)}/${commentId}/replies`;
var replyApiPath = (articleId, commentId) => `${commentApiPath(articleId)}/${commentId}/reply`;


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

export class comment{
    /**
     * fetch 50 replies from the comment which id is {comment_id}
     * @param {string} article_id
     * @param {string} comment_id
     * @param {string} lastId
     * @param {("date-sb"|"date-bs"|"gp"|"bp"|"replies")} sortBy
     * @returns {Array<comment>}
     */
    static async fetchReplies(articleId, commentId, sortBy = SORT_BY.DATE_SB, lastId = 0){
        var res = await axios.get(
            `${repliesApiPath(articleId, commentId)}?sortBy=${sortBy}&lastId=${lastId}`,
            { withCredentials: true }
        );
        res = res.data;
        return res.comments;
    }

    /**
     * dislike the comment
     * @param {string} article_id
     * @param {string} comment_id
     */
    static async bp(articleId, commentId){
        await axios.put(
            `${repliesApiPath(articleId, commentId)}/${commentId}/bp?user=${UserAPI.currentUserId}`,
            { withCredentials: true }
        );
    }

    /**
     * like the comment
     * @param {string} article_id
     * @param {string} comment_id
     */
    static async gp(articleId, commentId){
        await axios.put(
            `${repliesApiPath(articleId, commentId)}/${commentId}/gp?user=${UserAPI.currentUserId}`,
            { withCredentials: true }
        );
    }

    /**
     * reply to the comment
     * @param {string} article_id
     * @param {string} comment_id
     * @param {string} content
     */
    static async postReply(articleId, commentId, content){
        await axios.post(
            `${replyApiPath(articleId, commentId)}?user=${UserAPI.currentUserId}`,
            { content: content },
            { withCredentials: true }
        );
    }

    /**
     * delete the comment
     * @param {string} article_id
     * @param {string} comment_id
     */
    static async delete(articleId, commentId){
        await axios.delete(
            `${repliesApiPath(articleId, commentId)}/${commentId}?user=${UserAPI.currentUserId}`,
            { withCredentials: true }
        );
    }

    /**
     * get the comment's self vote status
     * @param {string} comment_id
     * @returns {Number} 1 : like, 0 : none, -1 : dislike
     */
    static async getSelfState(commentId){
        var res = await axios.get(
            `${articleApiPath}/bpgp/${commentId}?user=${UserAPI.currentUserId}`,
            { withCredentials: true }
        );
        res = res.data;
        return res.state;
    }

}



export class article {

    /**
     * get article list
     * @param {("date-sb"|"date-bs"|"gp"|"bp"|"replies")} sortBy
     * @param {string | number} lastId
     * @returns {Array<article>}
     */
    static getArticleList(sortBy = SORT_BY.DATE_SB, lastId = 0){
        return axios.get(
            `${articleApiPath}`,
            { params: { sortBy, lastId } },
            { withCredentials: true }
        );
    }

    /**
     * get article by id
     * @param {string} id
     * @returns {article}
     */
    static getArticleById(id){
        return axios.get(
            `${articleApiPath}/${id}`,
            { withCredentials: true }
        );
    }

    /**
     * get the article's self vote status
     * @param {string} id
     * @returns {Number} 1 : like, 0 : none, -1 : dislike
     */
    static async getSelfState(id){
        var res = await axios.get(
            `${articleApiPath}/gpbp/${id}?user=${UserAPI.currentUserId}`,
            { withCredentials: true }
        );
        res = res.data;
        return res.state;
    }

    /**
     * fetch 50 comments after the comment which id is {lastCommentId}
     * @param {string} id
     * @param {("date-sb"|"date-bs"|"gp"|"bp"|"replies")} sortBy
     * @param {string} lastCommentId
     * @returns {Array<comment>}
     */
    static fetchComments(id, sortBy = SORT_BY.DATE_SB, lastCommentId = 0){
        return axios.get(
            `${commentApiPath(id)}?sortBy=${sortBy}&lastId=${lastCommentId}`,
            { withCredentials: true }
        );
    }

    /**
     * dislike the article
     * @param {string} id
     */
    static async bp(id){
        await axios.put(
            `${articleApiPath}/${id}/bp?user=${UserAPI.currentUserId}`,
            { withCredentials: true }
        );
    }

    /**
     * like the article
     * @param {string} id
     */
    static async gp(id){
        await axios.put(
            `${articleApiPath}/${id}/gp?user=${UserAPI.currentUserId}`,
            { withCredentials: true }
        );
    }

    /**
     * post a comment to an article
     * @param {string} id
     * @param {string} content
     */
    static async postComment(id, content){
        await axios.post(
            `${commentApiPath(id)}?user=${UserAPI.currentUserId}`,
            { content: content },
            { withCredentials: true }
        );
    }

    /**
     * delete the article
     * @param {string} id
     */
    static async delete(id){
        await axios.delete(
            `${articleApiPath}/${id}?user=${UserAPI.currentUserId}`,
            { withCredentials: true }
        );
    }
}
