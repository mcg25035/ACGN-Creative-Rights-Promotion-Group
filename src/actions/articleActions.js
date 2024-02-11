import axios from 'axios';
import { FETCH_ARTICLE_LIST } from './actionTypes';

export const fetchArticleList = () => {
    const url = '/api/articles';
    // XXX: const testurl = 'https://api.publicapis.org/entries';
    const request = axios.get(url);
    return {
        type: FETCH_ARTICLE_LIST,
        payload: request
    };

};
