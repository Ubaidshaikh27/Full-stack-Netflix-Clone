import React, { useEffect, useState } from 'react'
import { useContentStore } from '../store/content';
import axios from 'axios';

const useGetTrendingContent = () => {

    const [trendingContent, setTrendingContent] = useState(null);
    const {contentType} = useContentStore(); //we will get the content type from the content store (movie or tv) through zustand, which helps us use as global function
    

    useEffect(() => {
        const getTrendingContent = async () => {
            const res = await axios.get(`/api/v1/${contentType}/trending`)
            setTrendingContent(res.data.content)
            //get the content from the API and set the trending content state, data which we got from api, by using useState
        }
        getTrendingContent();
    }, [contentType]);

    return { trendingContent};
}

export default useGetTrendingContent