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

class Comment{
    /**@type {Array<Comment>} */
    replies = [];
    /**@type {Number} */
    repliesCount;
    /**@type {Number} */
    bpCount;
    /**@type {Number} */
    gpCount;
    /**@type {string} */
    userId;
    /**@type {string} */
    id;
    /**@type {ArticleAPI} */
    article;
    /**@type {string} */
    content;
    /**@type {boolean} */
    error;
    /**@type {boolean} */
    isReply;
    /**@type {Number} */
    selfVote; //1 : gp, 0 : none, -1 : bp

    /**
     * @param {ArticleAPI} article
     * @param {string} content 
     * @param {string} userId 
     * @param {Number} bp 
     * @param {Number} gp 
     * @param {Number} replies 
     * @param {boolean} isReply
     */
    constructor(article, content, userId, bp, gp, replies, isReply, id){
        this.id = id;
        this.article = article;
        this.content = content;
        this.userId = userId;
        this.bpCount = bp;
        this.gpCount = gp;
        this.repliesCount = replies;
        this.isReply = isReply;
    }

    async fetchReplies(){
        if (this.isReply) return;

        try{
            var lastId;
            if (this.replies.length > 0){
                lastId = this.replies[this.replies.length - 1].id;
            }

            var res = await axios.get(
                `${commentApiPath(this.article.id)}/${this.id}/replies?sortBy=${this.article.sortBy}&lastId=${lastId}`
            );

            res = res.data;
            for (var i in res.comments){
                var that = res.comments[i];
                var comment = new Comment(
                    this.article, that.content, that.userId, that.bpCount, that.gpCount, that.repliesCount
                );
                this.replies.push(comment);
            }
        }
        catch(e){
            this.error = true;
            return;
        }
    }

    async bp(){
        var bp_api = this.isReply ?
        `${replyApiPath(this.article.id, this.id)}/${this.id}/bp` : `${commentApiPath(this.article.id)}/${this.id}/bp`;
        try{
            await axios.put(`${bp_api}?user=${UserAPI.currentUserId}`);
        }
        catch(e){
            UI.raiseError("Error", `此事件交互失敗: bp on article ${this.id}\n${e}`)
        }
        

        if (this.selfVote === -1){
            this.selfVote = 0;
            this.bpCount -= 1;
        }
    }

    async gp(){
        var gp_api = this.isReply ?
        `${replyApiPath(this.article.id, this.id)}/${this.id}/gp` : `${commentApiPath(this.article.id)}/${this.id}/gp`;
        try{
            await axios.put(`${gp_api}?user=${UserAPI.currentUserId}`);
        }
        catch(e){
            UI.raiseError("Error", `此事件交互失敗: gp on article ${this.id}\n${e}`)
        }
        if (this.selfVote === 1){
            this.selfVote = 0;
            this.gpCount -= 1;
        }
    }

}

class ArticleAPI{
    /**@type {string}*/
    id;
    /**@type {string} */
    sortBy = sortBy["date-bs"];
    /**@type {string} */
    title;
    /**@type {string} */
    content;
    /**@type {string} */
    thumbnail;
    /**@type {Array{Comment}}*/
    comments = [];
    /**@type {boolean} */
    article_error;
    /**@type {boolean} */
    comments_error;
    

    /**@param {string} id  */
    constructor(id){
        this.id = id;
    }

    async init(){
        try{
            var res = await axios.get(`${articleApiPath}/${this.id}`);
            res = res.data;

            this.title = res.title;
            this.content = res.content;
            this.thumbnail = res.thumbnail;
        }
        catch(e){
            this.article_error = true;
            return;
        }
    }

    async fetch_comments(){
        try{
            var res = await axios.get(`${commentApiPath(this.id)}?sortBy=${this.sortBy}`);
            res = res.data;

            for (var i in res.comments){
                var that = res.comments[i];
                var comment = new Comment(
                    this, that.content, that.userId, that.bp, that.gp, that.replies, false
                );
                this.comments.push(comment);
            }
        }
        catch(e){
            this.comments_error = true;
            return;
        }
    }

    async bp(){
        try{
            await axios.put(`${articleApiPath}/${this.id}/bp?user=${UserAPI.currentUserId}`);
        }
        catch(e){
            UI.raiseError("Error", `此事件交互失敗: bp_article on ${this.id}\n${e}`)
        }
    }

    async gp(){
        try{
            await axios.put(`${articleApiPath}/${this.id}/gp?user=${UserAPI.currentUserId}`);
        }
        catch(e){
            UI.raiseError("Error", `此事件交互失敗: gp_article on ${this.id}\n${e}`)
        }
    }
}


export default ArticleAPI;