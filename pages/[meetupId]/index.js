import { MongoClient,ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupId = (props) => {
  return <MeetupDetail  image={props.image} title={props.title} descrption={props.descrption}  />;
};

export async function getStaticPaths () {

  const client =  await MongoClient.connect('mongodb+srv://Mohammed:095959225@cluster0.e9fvapx.mongodb.net/meetups?retryWrites=true&w=majority');

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetupsId = await meetupsCollection.find({},{_id:1}).toArray();

  // console.log(meetupsId);

  client.close();

    return {
        fallback: true,
        paths: meetupsId.map((meetup) => ({params:{meetupId:meetup._id.toString()}}))
        // paths: [
        //     {
        //         params: {
        //             meetupId : 'm1'
        //         }
        //     }
        // ]
    }
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client =  await MongoClient.connect('mongodb+srv://Mohammed:095959225@cluster0.e9fvapx.mongodb.net/meetups?retryWrites=true&w=majority');

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)});


  client.close();

  return {
    props: {
      image: meetup.image,
      title: meetup.title,
      descrption:meetup.descrption,
      address: meetup.address,
      id: meetup._id.toString(),
    },
  };
}

export default MeetupId;