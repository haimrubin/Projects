import React, {useContext, useState} from "react";
import Input from "../../shared/components/FormElements/Input/Input";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/components/Utils/validators";
import Button from "../../shared/components/FormElements/Button";
import {AuthContext} from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/Error/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/Loading/LoadingSpinner";
import {useHistory} from "react-router-dom";

import {useHttpClient} from "../../shared/hooks/http-hook";
import {useForm} from "../../shared/hooks/form-hook";
import './PostForm.css';
import Select from "../../shared/components/FormElements/Select/Select";

const NewPost = () => {
    const [filter, setFilter] = useState("none");
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const auth = useContext(AuthContext)

    const [formState, inputChangeHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        },
        image: {
            value: '',
            isValid: false
        },

    },false)

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

   const history = useHistory();

   const placeSubmitHandler = async event => {
       event.preventDefault();
       try {
           await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/posts`,
               'POST',
               JSON.stringify({
                   title: formState.inputs.title.value,
                   description : formState.inputs.description.value,
                   address : formState.inputs.address.value,
                   category: filter,
                   image: formState.inputs.image.value
               }),
               {'Content-Type': 'application/json',
               Authorization: 'Bearer ' + auth.token}
           )
        history.push('/'); // redirect
       }catch (e) {
           
       }

   }
   

    return <React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>
        <form className="place-form" onSubmit={placeSubmitHandler}>
            {isLoading && <LoadingSpinner asOverlay/>}
            <Input
                id="title"
                element='input'
                type='text'
                label='Title'
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputChangeHandler}
                errorText="Please enter a valid title"/>

            <Input
                id="description"
                element='textarea'
                label='Description'
                validators={[VALIDATOR_MINLENGTH(5)]}
                onInput={inputChangeHandler}
                errorText="Please enter a valid description."/>

            <Select items={FilterType} onChange={handleFilter} />

            <Input
                id="address"
                element='input'
                label='Address'
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputChangeHandler}
                errorText="Please enter a valid address"/>

            <Input
                id="image"
                element='input'
                label='Image'
                validators={[]}
                onInput={inputChangeHandler}
                errorText="Please enter a url"/>

            <Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>
        </form>
    </React.Fragment>

};

export default NewPost;