import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticleList } from './actions';
import './Nav.scss';
import IdeaShow from './IdeaShow';
import IndexContentContainer from './IndexContentContainer';

function IndexPage(){
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('mount');
    }, []);

    useEffect(() => {
        dispatch(fetchArticleList());
        console.log('triggered');
    }, [dispatch]);

    return (
        <>
            <IdeaShow />
            <IndexContentContainer />
        </>
    );
}

export default IndexPage;
