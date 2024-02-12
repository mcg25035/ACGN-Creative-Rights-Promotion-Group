import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {};

// XXX: test data
const mockData = {
    title: "測試用文章",
    content: "如懶人包所述，組織「不贊同」本次的連署提案，原因如下：\n第一、論點論證不夠完善；目前對於這個議題有利的論點多到可以寫成一篇論文，光是在 ⁠情報整理 就有非常多有力的論證可以被採用。然而目前這個連署案所提及的論點卻僅僅是一部份的面向。完整性與說服力存疑。\n第二、連署發表過於倉促；缺乏多方思辨，論點不夠全面且容易被鑽漏洞。無懈可擊的論點必須經過不斷地反駁、修正才有機會誕生。當局者迷，旁觀者清。提出連署的並非社群或平台，而是個人，缺乏多方思辨的能力。\n第三、時間尚餘；並不是說這件事不急，而是分明可以準備得更妥當再出發，卻選擇揠苗助長。\n第四、溝通無果；目前我們僅有單方面的收到這位提案者希望我們協助擴散連署的訊息，但是對於我們提出的疑問與建議尚無下文。無法與提案者溝通、協調。\n第五、撞題；PTT平台版主已表明將會在準備妥當後發起連署，並提醒其他準備連署的人不要撞題，待他們統一發表。我們傾向於與PTT、DCARD網友合作之後在共同發表連署，這有助於提出一個更為完備、具說服力的提案。然而如今這項不夠完整的提案遭到發表，未來將無法發表同樣的提案，導致更為完善的提案無法發起。\n\n綜上所述，我們判斷這個連署案過於倉促，且在沒有經過足夠的思辨與驗證便草率地發起了本次連署。組織立場上感激所有為這個議題所做出貢獻的朋友，只是如此草率的舉動容易導致未來這個議題因為論點的說服力不足、全面性不足而遭到駁回。\n「連署」並不是只要通過連署人數的門檻就沒事了，通過門檻之後，將會送交主管機關研討，於2個月內具體回應參採情形，並公布於公共意見平臺。\n換句話說，即便通過連署，如果無法說服主管機關去改善，那麼問題仍舊無法解決。無法解決之餘，情況可能還會進一步惡化，因此每一步都必須要謹慎處理。",
    imageSrc: "/p1.png"
};

export const fetchArticle = createAsyncThunk('article\fetchArticle', async (articleId) => {
    const url = `/api/articles/${articleId}`;
    try {
        const response = await axios.get(url);
        // return response?.data;
        return mockData;
    } catch (error) {
        console.error(error);
    }
});


const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchArticle.fulfilled, (state, action) => action.payload);
    }
});

export default articleSlice.reducer;
