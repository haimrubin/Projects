import React, {useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import Input from "../../shared/components/FormElements/Input/Input";
import Button from "../../shared/components/FormElements/Button";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/components/Utils/validators";
import Card from "../../shared/components/UIElements/Card/Card";
import LoadingSpinner from "../../shared/components/UIElements/Loading/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/Error/ErrorModal";
import {AuthContext} from "../../shared/context/auth-context";
import {useHttpClient} from "../../shared/hooks/http-hook";
import {useForm} from "../../shared/hooks/form-hook";

import './PostForm.css';
const UpdateAdminPost = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedPost, setLoadedPost] = useState();
    const postId = useParams().postId;
    const auth = useContext(AuthContext)
    const history = useHistory();

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: true
        },
        description: {
            value: '',
            isValid: true
        }
    }, true)

    const placeUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/admin/post/${postId}`,
                'PATCH',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description : formState.inputs.description.value,
                }),
                {'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token}
            )
            history.push('/');
        }catch (e) {

        }

    }

    useEffect(() => {
        const fetchPost = async() => {
            try {
                const data = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/admin/post`);
                setLoadedPost(data.posts[0])

                setFormData(
                    {
                        title: {
                            value: data.posts[0].title,
                            isValid: true
                        },
                        description: {
                            value: data.posts[0].description,
                            isValid: true
                        }
                    },true)
            }
            catch (e) {

            }
        }
        fetchPost();
    },[setFormData, postId, sendRequest])


    if(isLoading) {
        return <div className="center">
            <LoadingSpinner/>
        </div>
    }

    if(!loadedPost && !error){
        return <div className="center">
            <Card>
                <h2>Couldn't fetch post</h2>
            </Card>
        </div>
    }



    return <React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>
        {!isLoading && loadedPost && <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
            <Input
                id="title"
                element='input'
                type='text'
                label='Title'
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                initialValue={loadedPost.title}
                initialIsValid={true}
                errorText="Please enter a valid title"/>

            <Input
                id="description"
                element='textarea'
                label='Description'
                validators={[VALIDATOR_MINLENGTH(5)]}
                onInput={inputHandler}
                initialValue={loadedPost.description}
                initialIsValid={true}
                errorText="Please enter a valid description."/>

            <Button type="submit" disabled={!formState.isValid}>UPDATE POST</Button>
        </form>}
    </React.Fragment>

}

export default UpdateAdminPost;