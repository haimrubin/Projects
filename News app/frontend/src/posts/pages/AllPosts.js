import React, {useContext, useEffect, useState} from "react";
import PostList from "../components/PostList";
import LoadingSpinner from "../../shared/components/UIElements/Loading/LoadingSpinner";
import AdminPostItem from "../components/AdminPostItem";
import {useHttpClient} from "../../shared/hooks/http-hook";
import Select from "../../shared/components/FormElements/Select/Select";
import {AuthContext} from "../../shared/context/auth-context";

const AllPosts = props => {
    const auth = useContext(AuthContext);
    const [filter, setFilter] = useState("none");
    const [titleSearch, setTitleSearch] = useState("");
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedPosts, setLoadedPosts] = useState([]);
    const [loadedAdminPost, setLoadedAdminPost] = useState();
    const [loadedExchange, setLoadedExchange] = useState([]);

    const inputChangeHandler = (event) => {
        console.log('change ', event.target.value);
        setTitleSearch(event.target.value);
    }

    const FilterType = [
        { id: 1, label: "Select Category", value: "none" },
        { id: 2, label: "Sport", value: "sport" },
        { id: 3, label: "Politics", value: "politics" },
        { id: 4, label: "Economics", value: "economics" },
        { id: 5, label: "Culture", value: "culture" },
    ];

    const handleFilter = (value) => {
        setFilter(value);
    };


    useEffect(() => {
        const fetchAdminPost = async () => {
            try {
                const data = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/admin/post`);
                setLoadedAdminPost(data.posts[0])
            }catch (e) {

            }

        }
        fetchAdminPost();
    }, [sendRequest])

    useEffect(() => {
        const fetchPosts= async () => {
            try {
                const data = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/posts`);
                setLoadedPosts(data.posts)
            }catch (e) {

            }

        }
        fetchPosts();
    }, [sendRequest])

    useEffect(() => {
        const fetchPosts= async () => {
            if(auth.token) {
                try {
                    const data = await sendRequest('https://api.exchangerate.host/latest')
                    setLoadedExchange(Object.entries(data.rates));
                }catch (e) {
                    console.log(e)
                }
            }
        }
        fetchPosts();
    }, [sendRequest, auth.token])


    useEffect(() => {
        const fetchPosts= async () => {
            if(auth.token) {
                try {
                    const data = await sendRequest('https://api.exchangerate.host/latest')
                    setLoadedExchange(Object.entries(data.rates));
                }catch (e) {
                    console.log(e)
                }
            }
        }
        fetchPosts();
    }, [sendRequest, auth.token])
    
    return <React.Fragment>
        {isLoading && <div className="center">
            <LoadingSpinner/>
        </div>}

       
        {!isLoading && loadedAdminPost &&
        <AdminPostItem
            id={loadedAdminPost?.id}
            title={loadedAdminPost?.title}
            description={loadedAdminPost?.description}
            image={loadedAdminPost?.image}/>
        }


        {!isLoading && loadedPosts &&
        <div className="filters">
            <Select items={FilterType} onChange={handleFilter}/>
            <input
                id="title"
                type='text'
                onInput={inputChangeHandler}/>
        </div>
        }


        {!isLoading && loadedPosts &&
             <PostList items={loadedPosts.filter((p)=>{
                 if(filter !== 'none' && titleSearch) {
                     return p.category === filter && p.title.includes(titleSearch);
                 }else if(filter !== 'none' && !titleSearch) {
                     return p.category === filter;
                 }else if(filter === 'none' && titleSearch) {
                     return p.title.includes(titleSearch);
                 }
                 else{
                     return p;
                 }
             })}/>
        }

        {!isLoading && loadedExchange &&
            <div className={'apiNews'}>
                <ul className="app-news-list">
                    {loadedExchange.map(o => {
                        return <li key={o}>
                            <span>{o[0]}</span>
                            <span>{o[1]}</span>
                        </li>
                    }) }
                </ul>
            </div>
        }

    </React.Fragment>



}

export default AllPosts;