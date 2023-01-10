import {useState,useEffect} from 'react';
import MeetupList from "../components/meetups/MeetupList";
import {MongoClient} from 'mongodb';

// const meetups = [
//   {
//     id: "m1",
//     image:
//       "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vox.com%2Fthe-goods%2F2018%2F10%2F26%2F18025000%2Fwalkable-city-walk-score-economy&psig=AOvVaw16BWJBLdTjspVvzX0_OZ4x&ust=1673375963481000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCOCYpcaRu_wCFQAAAAAdAAAAABAJ",
//     title: "title1",
//     address: "address1: street1 100"
//   },
//   {
//     id: "m2",
//     image:
//       "https://media.istockphoto.com/id/1225153424/photo/night-view-of-city-lights-in-front-of-marble-square-xuzhou-china.jpg?s=612x612&w=0&k=20&c=N7cfMu-ChX4uf6tsywMhLuKg2_j8JVGF15Rvzs9emr0=",
//     title: "title2",
//     address: "address2: street2 100"
//   },
// ];


const HomePage = (props) => {
    // const [loadedMeetups,setLoadedMeetups] = useState([]);

    // useEffect(() => {
    //   setLoadedMeetups(meetups);
    // }, [])
    

  return <MeetupList meetups={props.meetups}></MeetupList>;
};


export async function getStaticProps() {
  const client = await MongoClient.connect('mongodb+srv://Mohammed:095959225@cluster0.e9fvapx.mongodb.net/meetups?retryWrites=true&w=majority');

  const db = client.db();

  const meetupCollection = db.collection('meetups');

  const meetupsList = await meetupCollection.find().toArray();

  client.close();

    return {
      revalidate: 1,
        props: {
            meetups: meetupsList.map(meetup=> ({
            
                title: meetup.title,
                descrption: meetup.description,
                image: meetup.image,
                address: meetup.address,
                id: meetup._id.toString()
            }))
        }
    }
}
export default HomePage;
