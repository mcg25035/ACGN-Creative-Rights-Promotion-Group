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
    /**@type {Comment | ArticleAPI} */
    target;
    /**@type {ArticleAPI} */
    article;
    /**@type {string} */
    content;
    /**@type {boolean} */
    error;
    /**@type {Number} */
    selfVote; //1 : gp, 0 : none, -1 : bp

    /**
     * @param {ArticleAPI} article
     * @param {string} content 
     * @param {string} userId 
     * @param {Comment | ArticleAPI} target
     * @param {Number} bp 
     * @param {Number} gp 
     * @param {Number} replies 
     */
    constructor(article, content, userId, bp, gp, replies, id, target){
        this.id = id;
        this.article = article;
        this.content = content;
        this.userId = userId;
        this.bpCount = bp;
        this.gpCount = gp;
        this.repliesCount = replies;
        this.target = target;
    }

    async fetchReplies(){
        if (this.target instanceof Comment) return false;

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
                    this.article, that.content, that.userId, that.bpCount, that.gpCount, that.repliesCount, 
                    that.id, this
                );
                this.replies.push(comment)
            }
            return true
        }
        catch(e){
            this.error = true
            return false
        }
    }

    async bp(){
        var bp_api = (this.target instanceof Comment) ?
        `${replyApiPath(this.article.id, this.id)}/${this.id}/bp` : `${commentApiPath(this.article.id)}/${this.id}/bp`;
        try{
            await axios.put(`${bp_api}?user=${UserAPI.currentUserId}`);
            if (this.selfVote === -1){
                this.selfVote = 0;
                this.bpCount -= 1;
            }
            return true
        }
        catch(e){
            UI.raiseError("Error", `此事件交互失敗: bp on article ${this.id}\n${e}`)
            return false
        }
        
    }

    async gp(){
        var gp_api = (this.target instanceof Comment) ?
        `${replyApiPath(this.article.id, this.id)}/${this.id}/gp` : `${commentApiPath(this.article.id)}/${this.id}/gp`;
        try{
            await axios.put(`${gp_api}?user=${UserAPI.currentUserId}`);
            if (this.selfVote === 1){
                this.selfVote = 0;
                this.gpCount -= 1;
            }
            return true
        }
        catch(e){
            UI.raiseError("Error", `此事件交互失敗: gp on article ${this.id}\n${e}`)
            return false
        }
    }

    async postReply(content){
        try{
            var id = this.id

            if (this.target instanceof Comment){
                id = this.target.id;
            }

            await axios.post(`${replyApiPath(this.article.id, id)}?user=${UserAPI.currentUserId}`, {
                content: content
            });

            if (this.target instanceof Comment){
                this.target.repliesCount += 1;
            }

            return true
        }
        catch(e){
            UI.raiseError("Error", `此事件交互失敗: post_reply on article ${this.id}\n${e}`)
            return false
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
            var res = await axios.get(`${articleApiPath}/${this.id}`)
            res = res.data

            this.title = res.title
            this.content = res.content
            this.thumbnail = res.thumbnail
            return true
        }
        catch(e){
            this.article_error = true
            return false
        }
    }

    async fetch_comments(){
        try{
            var res = await axios.get(`${commentApiPath(this.id)}?sortBy=${this.sortBy}`);
            res = res.data;

            for (var i in res.comments){
                var that = res.comments[i];
                var comment = new Comment(
                    this, that.content, that.userId, that.bp, that.gp, that.replies, that.id, this
                );
                this.comments.push(comment);
            }
            return true
        }
        catch(e){
            this.comments_error = true
            return false
        }
    }

    async bp(){
        try{
            await axios.put(`${articleApiPath}/${this.id}/bp?user=${UserAPI.currentUserId}`)
            return true
        }
        catch(e){
            UI.raiseError("Error", `此事件交互失敗: bp_article on ${this.id}\n${e}`)
            return false
        }
    }

    async gp(){
        try{
            await axios.put(`${articleApiPath}/${this.id}/gp?user=${UserAPI.currentUserId}`)
            return true
        }
        catch(e){
            UI.raiseError("Error", `此事件交互失敗: gp_article on ${this.id}\n${e}`)
            return false
        }
    }

    async postComment(content){
        try{
            await axios.post(`${commentApiPath(this.id)}?user=${UserAPI.currentUserId}`, {
                content: content
            });
            return true
        }
        catch(e){
            UI.raiseError("Error", `此事件交互失敗: post_comment on ${this.id}\n${e}`)
            return false
        }
    }
}


export default ArticleAPI;