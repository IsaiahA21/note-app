import dbConnect from "../../utils/dbConnect";

// call db connect fucntion
dbConnect();

// export defualt an assoynomus async function
export default async(req,res) => {
    res.json({test: 'test'});
}