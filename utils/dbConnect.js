import mongoose from "mongoose";

const connection = {};

// this function checks if we already have a connection to our database
// if we do we return, else we setup the connection

async function dbConnect() {
    if(connection.isConnected){
       return; 
    }
    try {
    const db = await mongoose.connect("mongodb+srv://user1:password1234@cluster0.zbb2xhj.mongodb.net/?retryWrites=true&w=majority",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        // set our conenction and set the isConnected property to ready state
        connection.isConnected = db.connections[0].readyState;
        if(connection.isConnected){
            console.log('\u001b[' + 32 + 'm' + "connected to database"+ '\u001b[0m');
        }
    } catch(error) {
        console.log('\u001b[' + 31 + 'm' + "failed to connect to database"+ '\u001b[0m');
        console.log(error);
        process.exit(1);
    }

}

export default dbConnect;