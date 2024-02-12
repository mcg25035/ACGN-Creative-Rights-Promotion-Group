import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchArticleList } from './slices';
import './Nav.scss';
import IdeaShow from './IdeaShow';
import IndexContentContainer from './IndexContentContainer';

function IndexPage(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchArticleList());
    }, [dispatch]);

    return (
        <>
            <IdeaShow />
            <IndexContentContainer />
        </>
    );
}

export default IndexPage;
