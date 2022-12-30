// [id] is called a dynamic route
// to test this in postman or web, "http://localhost:3001/api/notes/someID" 
//it is going to grab that id from this file

import dbConnect from "../../../utils/dbConnect";
import Note from "../../../modules/Note";

dbConnect();

export default async (req,res) =>{
    // going to destructure the request query, and grab the id
    // the id is what is after notes(eg,/someID)

    //extract form req
    const {
        query: {id},
        method
    } = req;

    switch(method){
        // to test this in postman or web, create a GET request to "http://localhost:3001/api/notes/63ac9aa038fd0e84cb4eb639"  
        case 'GET':
            try {
                const note = await Note.findById(id);
                if (!note){// note doesn't exist
                    res.status(400).json({success: false})
                    console.log('\u001b[' + 35 + 'm' + "GET request findById couldn't find note with the ID "+ id + '\u001b[0m')
                }
                res.status(200).json({success: true, data:note});
                console.log('\u001b[' + 32 + 'm' + "GET request findById found note with the ID "+ id + '\u001b[0m');

            } catch (error) {
                console.log('\u001b[' + 31 + 'm' + "GET request findById failed" + '\u001b[0m')
                res.status(400).json({success: false})
                console.log(error);
            }
            break;

        case 'PUT':
        // to test this in postman or web, create a PUT request to "http://localhost:3001/api/notes/63ac9aa038fd0e84cb4eb639" and add a body
        /**  with the changes of
         * {
         * "title":  "Test note 1.change",
         * "description": "Test description changed"
         * } */ 
        try {
            const note = await Note.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});

            if (!note){// if the note we are trying to delete doesn't exist
                res.status(400).json({success: false})
                console.log('\u001b[' + 36 + 'm' + "PUT request findByIdAndUpdate couldn't find note with the ID "+ id + '\u001b[0m')
            }
            res.status(200).json({success: true, data:note});
            console.log('\u001b[' + 32 + 'm' + "PUT request findByIdAndUpdate found note with the ID "+ id + " update it"+ '\u001b[0m');
        
        } catch (error) {
            console.log('\u001b[' + 31 + 'm' + "PUT request findByIdAndUpdate failed" + '\u001b[0m')
            res.status(400).json({success: false})
            console.log(error);
        }
        break;

        // to test this in postman or web, create a DELETE request to "http://localhost:3001/api/notes/63acab51705bc7bb98ff1a72"
        case 'DELETE':
            try {
                // we are going to lookup the note to be deleted. search where _id equals id
                const deletedNote = await Note.deleteOne({ _id: id});

                if(deletedNote.deletedCount < 1){// if the note couldn't be found
                    console.log('\u001b[' + 35 + 'm' + "DELETE request deleteOne couldn't delete note with the ID "+ id + '\u001b[0m')
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, data:{}});
                console.log('\u001b[' + 32 + 'm' + "DELETE request deleteOne found note with the ID "+ id + " and delete it"+ '\u001b[0m');
            
            } catch (error) {
                console.log('\u001b[' + 31 + 'm' + "DELETE request deleteOne failed" + '\u001b[0m')
                res.status(400).json({success: false})
                console.log(error);
            }
            break;
        default:
            res.status(401).json({success: false})
            break;
    }
}
