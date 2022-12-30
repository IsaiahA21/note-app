/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../utils/dbConnect";
import Note from "../../../modules/Note";

dbConnect();

export default async (req,res) =>{
    // want to determine what request is coming in
    const {method} = req;
    console.log("In /api/notes/index.js");

    // we use a switch 
    // to test this in postman or web, create a GET request to "http://localhost:3001/api/notes"
    switch(method) {
        case 'GET':
            try {
                // this we find all the notes we have in our database
                const notes = await Note.find({});
                res.status(200).json({success: true, data: notes});
                console.log('\u001b[' + 32 + 'm' + "Recieved a GET request" + '\u001b[0m')
            } catch (error) {
                res.status(400).json({success: false});
                console.log('\u001b[' + 31 + 'm' + "GET request failed" + '\u001b[0m')
                console.log(error);
            }
            break;
        case 'POST':
        // to test this in postman, create a POST request to "http://localhost:3001/api/notes" and a body 
        /**
        * {
            "title":  "Test note 8",
            "description": "Test description8",
            "dateCreated": "21/02/2022",
            "dateModified": "21/02/2022"
        }
         */
            try {
                const note = await Note.create(req.body);
                res.status(201).json({success: true, data:note})
                console.log('\u001b[' + 32 + 'm' + "Post request successful" + '\u001b[0m')
            } catch (error) {
                res.status(400).json({success: false})
                console.log('\u001b[' + 31 + 'm' + "Post request failed" + '\u001b[0m')
                console.log(error);
            }
        default:
            res.status(400);
            break;
    }
}