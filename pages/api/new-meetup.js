import {MongoClient} from 'mongodb';

const handler =  async (req,res) => {
    if(req.method === 'POST') {

        const data = req.body;

        // const {title,image,address,descrption,} = data;

        const client = await MongoClient.connect('mongodb+srv://Mohammed:095959225@cluster0.e9fvapx.mongodb.net/meetups?retryWrites=true&w=majority');

        const db =  client.db();

        const meetupsCollection = db.collection('meetups');

        const meetups = await meetupsCollection.insertOne(data);
        
        console.log(meetups);

        // setTimeout(() => {client.close()}, 1500)

        return res.status(200).json({message: 'add a new meetup has successful'})
    }
}

export default handler;