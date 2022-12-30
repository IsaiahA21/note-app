// the pages/[id] folder will handle any routing when we click view 
// the route will be localhost:3001/[note._id]

import fetch from 'isomorphic-unfetch'
import {useState, useEffect} from 'react'
import {Router, useRouter } from "next/router";
import { Confirm, Button, Loader, Container } from 'semantic-ui-react';

// specificNote component will render out data so we need getInitialProps to fetch data
const specificNote = ({ note }) => {//grab the note property
    const [confirmState, setConfirm] =useState(false); // this is meant to handle the confirm component for semantic
    // when we click the delete button, we want a loader to popup
    
    // this is used to keep track of our loader if its currently deleting
    const[isDeleting, setIsDeleting] = useState(false); 
    const router = useRouter();
    
    function openConfirmation() {
        setConfirm(true);
    }
    const closeConfirmation = () => setConfirm(false);

    async function handleDelete() {
        setIsDeleting(true);// we are currentl deleting
        closeConfirmation();// run the closeConfirmation method to close the popup
    }

    //run useEffect when we are currently deleting
    // useEffect will be trigger when there is a change in isDeleting
    // handleDelete will trigger this method
    useEffect(() => {
        if(isDeleting){// if deleting is true, then we want to deleteNote
            deleteNote();
        }
    }, [isDeleting])

    const deleteNote = async () => {
        const noteId = router.query.id;// get the Id of the note to be delete
        try {
            const deleted = await fetch(`http://localhost:3001/api/notes/${noteId}`,{
                method: "DELETE"
            })
            router.push("/"); // route back to home aka pages/index.tsx
        } catch (error) {
            console.log('%c⧭', 'color: #e50000', "Insde pages/[id]/index.js deleteNote method: \n"+error);
        }
    }

    return (
        <div className='view-container'>
            {/* // if isDeleting is true, then display the loader,
            // else, */}
            {isDeleting  
                ? <Loader active />
                : 
                <>
                    <h1>{note.title}</h1>
                    <p>{note.description}</p>
                    <Button color='red' onClick={openConfirmation}>Delete</Button>
                </>
            }
            <Confirm
            open={confirmState}
            onCancel={closeConfirmation}// we run a method called closeConfirmation
            onConfirm={handleDelete} // when we click "yes" or "ok", call method
            />
        </div>
    )
}

// when the user click the view button, we need to grab the id parameter from the url
//we extract out a query. query is an object with its own properties. we grab the id
specificNote.getInitialProps = async ({query: {id}}) => {
    const res = await fetch(`http://localhost:3001/api/notes/${id}`);

    const {data} = await res.json();
    console.log('%c⧭', 'color: #00bf00','rendering the data from button view: ' + data);
    return { note: data } //return an object, with the property called note
}

export default specificNote;