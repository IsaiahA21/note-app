import Link from "next/link";
import { useState, useEffect } from "react"; 
//The React useState Hook allows us to track state in a function component.
//State generally refers to data or properties that need to be tracking in an application

//seEffect Hook allows you to perform side effects in your components.
//Some examples of side effects are: fetching data, directly updating the DOM, and timer

import React, { Component } from 'react'
import { Button, Form, Loader,Grid} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'
import { useRouter } from "next/router";

const NewNote = () => {

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    // form is the current state
    //is the function that is used to update our state
    const [form,setForm] = useState({title:'', description:'', dateCreated:date,dateModified:date})// initial value is an object, whose values are blank

    const [isSubmitting, setIsSubmitting] = useState(false); // initial value are blank 
    // state variable to keep track of when we are submitting

    const [errors, setErrors] = useState({})// initial value is an empty object
    const router = useRouter();

    // we want our useEffect to run whenever our error state changes
    useEffect(() => {
        if(isSubmitting === true){
            // Object.keys returns an array of all the keys in the object
            //we check if our error state is 0, meaning we have no errors
            if(Object.keys(errors).length ===0) {
                createNote();// run our create note method. createNote runs our http request post request
            }
            else{
                // if there are error set the state to false
                setIsSubmitting(false);
                // alert("there is an error in the form")
            }
        }
    },[errors]) // renders when [errors] changes

    const createNote = async() => {
        try {
            const respond = await fetch('http://localhost:3001/api/notes', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(form)
            })
            console.log('%c%s', 'color: #00e600', respond);
            router.push("/")// route back to homepage
        } catch (error) {
            console.log('%c%s', 'color: #ff0000', "inside createNote \n" +error);
        }
    } 
    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate(); // errs is a variable validate is a function define down below
        setErrors(errs);
        setIsSubmitting(true);
    }
    // everytime the user types into the field we want to update our form state
    //e is the event object
    const handleChange = (e) => {
        // create a new object
        setForm({
            // spread out the current form state
            ...form,
            // now update a specific property in our form object
            //[e.target.name]:e.target.value is a dynamic property
            // this allows us to use the same function for each of our form input
            // we will grab the name(i.e title) and the value( what is the new value)
            [e.target.name]:e.target.value
        })
    }
    const validate = () => {
        let err = {}; // we will populate the err object with any errors we find
        
        if(!form.title){// if form title is empty
            err.title = 'Title is required';// grab the err object and add the title prop to it
        }
        if(!form.description){
            err.description='Description is required';
        }
        if(!form.dateCreated){
            err.description='date Created is required';
        }
        if(!form.dateModified){
            err.description='date Modified is required';
        }
        return err;
    }

    return(
        <div className="form-container">
            <h1>Create Note</h1>
            <div>
                {/* //js logic
                //we are going to check if we are submitting
                // if we are submitting, then we want to display our loader component
                // else if we are not submitting display the form */}
                {
                    isSubmitting
                        ? <Loader active inline='centered'/>
                        :<Form onSubmit={handleSubmit}> 
                            {/* // prop of onSubmit and set it to the handleSubmit function */}
                            <Form.Input
                            fluid
                            label='Title'
                            placeholder='title'
                            name='title'
                            value={form.title ? form.title : null}
                            // we grab the error state, and check if there is an error in the title
                            error= {errors.title ? {
                                content:'please enter a title',
                                pointing: 'below'
                                } : null
                            }
                            onChange={handleChange}// a function
                            />

                            <Form.TextArea
                            fluid
                            label='Description'
                            placeholder='Description'
                            name='description'
                            value={form.description ? form.description : null}
                            error= {errors.description ? {
                                content:'please enter a Description',
                                pointing: 'below'
                                } : null
                            }
                            onChange={handleChange}
                            />
                            <Form.Group widths='equal'>
                                <Form.Input fluid label="Created On" name="dateCreated" readonly='' value={form.dateCreated} onChange={handleChange}/>
                                <Form.Input fluid label="Modified On" name="modifiedOn" readonly='' value={form.dateModified} onChange={handleChange}/>
                            </Form.Group>
                            <Button type="submit">Create</Button>
                        </Form>
                }
            </div>
        </div>
    )

}
export default NewNote;